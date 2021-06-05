import { useState } from "react";
import NfcManager, { NfcEvents } from "react-native-nfc-manager";

export default () => {
  const [tag, setTag] = useState(null);

  const initNFC = async () => {
    await NfcManager.start();
  };

  const readNFC = () => {
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      console.log("NFC Tag Readed: ", tag);
      setTag(tag);
      NfcManager.unregisterTagEvent().catch(() => 0);
    });

    NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
      cleanUp();
      setTag(null);
    });

    NfcManager.registerTagEvent();
  };

  return { initNFC, readNFC, tag };
};
