import { useNetInfo } from "@react-native-community/netinfo";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { ToastAndroid } from "react-native";
import useSetState from "react-use/lib/useSetState";
import useFirestore from "./useFirestore";
import useNFCManager from "./useNFCManager";

const isSubscriptionExpired = (expirationDate) => {
  const expiryDate = DateTime.fromISO(expirationDate.toDate().toISOString());
  const today = DateTime.now();
  return expiryDate < today;
};

const diffHoursFromToday = (date) => {
  console.log(date);
  const _date1 = DateTime.fromISO(date);
  const _date2 = DateTime.now();

  const diff = _date2.diff(_date1, ["hours"]);
  console.log(diff.toObject().hours);
  return diff.toObject().hours;
};

const appStates = {
  init: "init",
  start: "start",
  reading: "reading",
  manualRegistration: "manual",
  verifying: "verifying",
  error: "error",
  fetching: "fetching",
  registering: "registering",
  disconnected: "notConnected",
};

const successMsgs = {
  entryAdded: "Usuario registrado correctamente",
};

const errorMsgs = {
  cardNotFound: "¡Ojo! ¡La tarjeta no es una Serial!",
  connectionError: "Error interno. Vuelva a intentarlo.",
  subscriptionExpired: "¡Ups! ¡La subscripción del socio ha caducado!",
  userNotFound: "No hemos podido encontrar el DNI del usuario en nuestra BD",
  userHasEnteredToday: "Este socio ya ha entrado esta noche",
};

const initialState = {
  appState: appStates.init,
  dni: "",
  user: null,
};

const showToast = (msg) => {
  ToastAndroid.showWithGravityAndOffset(
    msg,
    ToastAndroid.LONG,
    ToastAndroid.TOP,
    0,
    300
  );
};

export default () => {
  const { initNFC, readNFC, tag } = useNFCManager();
  const {
    findUserByDni,
    findUserByNFCTag,
    findLastEntryDateByDni,
    addUserEntry,
  } = useFirestore();
  const [state, setState] = useSetState(initialState);
  const { isConnected } = useNetInfo();

  const reset = () => {
    setState({ user: null, dni: "", appState: appStates.start });
  };

  useEffect(() => {
    // When tag changes, get user by tag
    const findUser = async (_tag) => {
      setState({ appState: appStates.fetching });
      if (_tag) {
        const user = await findUserByNFCTag(_tag.id);
        if (!user) {
          showToast(errorMsgs.cardNotFound);
          reset();
        } else if (isSubscriptionExpired(user.expiration_date)) {
          showToast(errorMsgs.subscriptionExpired);
          reset();
        } else {
          const last = await findLastEntryDateByDni(user.dni);
          if (diffHoursFromToday(last.toISOString()) < 12) {
            showToast(errorMsgs.userHasEnteredToday);
            reset();
          } else {
            setState({ user, appState: appStates.verifying });
          }
        }
      }
    };
    findUser(tag);
  }, [tag]);

  useEffect(() => {
    console.log("Is connected:", isConnected);
    if (isConnected && state.appState === appStates.disconnected) {
      reset();
    } else if (!isConnected && state.appState !== appStates.disconnected) {
      setState({ user: null, dni: "", appState: appStates.disconnected });
    }
  }, [isConnected]);

  const readCard = async () => {
    initNFC();
    readNFC();
    setState({ appState: appStates.reading });
  };

  const getUserByDNI = async () => {
    setState({ appState: appStates.fetching });
    try {
      const user = await findUserByDni(state.dni);
      if (!user) {
        showToast(errorMsgs.userNotFound);
        reset();
      } else if (isSubscriptionExpired(user.expiration_date)) {
        showToast(errorMsgs.subscriptionExpired);
        reset();
      } else {
        const last = await findLastEntryDateByDni(user.dni);
        if (diffHoursFromToday(last.toISOString()) < 12) {
          showToast(errorMsgs.userHasEnteredToday);
          reset();
        } else {
          setState({ user: user, appState: appStates.verifying });
        }
      }
    } catch (e) {
      showToast(e);
      reset();
    }
  };

  const acceptUser = async () => {
    setState({ appState: appStates.registering });
    try {
      await addUserEntry(state.user);
      showToast(successMsgs.entryAdded);
    } catch (e) {
      showToast(errorMsgs.connectionError);
    }
    reset();
  };

  return {
    appStates,
    ...state,
    readCard,
    getUserByDNI,
    acceptUser,
    setAppState: setState,
    resetAppState: reset,
  };
};
