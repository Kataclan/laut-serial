import React, { useEffect } from "react";
import useNFCManager from './hooks/useNFCManager';

const APP_PAGES = {
  start: "start",
  scanning: "scanning",
  manualRegistration: "manual",
  verifying: "verifying",
  verified: "verified",
  error: "error",
};

const initialState = {
  page: APP_PAGES.start,
  tagNFC: null,
};
const actions = {
  RESET: "RESET",
  SCAN_CARD: "READ_CARD",
  VERIFY_CARD: "VERIFY_CARD",
  VERIFICATION_SUCCESS: "VERIFICATION_SUCCESS",
  VERIFICATION_ERROR: "VERIFICATION_ERROR",
};
const appReducer = (state, action) => {
  switch(action.type){
    case actions.VERIFY_CARD:
      return {
        ...state,
        page: APP_PAGES.verifying
      }
    case actions.SCAN_CARD:
      return {
        ...state,
        page: APP_PAGES.scanning
      }
    case actions.RESET:
      return initialState;
    default:
      return state;
  }
};

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [{ page }, dispatch] = React.useContext(
    appReducer,
    initialState
  );
  const { initNFC, readNFC, tag } = useNFCManager();

  const readCard = async () => {
    try {
      await initNFC();
      dispatch({ type: actions.SCAN_CARD }, readNFC);
    } catch {
      console.log("ERROR: initNFC()");
    }
  } 

  const verifyCard = (tag) => {
    const isTagInBD = false;
    if (isTagInBD){
      // UPDATE ENTRY 
      dispatch({ type: })
      setTimeout(() => { dispatch({ type: actions.RESET })}, 1000);
    } else {
    }
  }

  const contextValue = {
    page,
    tagNFC,
    initNFC,
    readNFC,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

AppContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default () => useContext(AppContext);
