import firestore from "@react-native-firebase/firestore";

export default () => {
  const usersCollection = firestore().collection("users");
  const entriesCollection = firestore().collection("entries");

  const addUserEntry = async (user) => {
    await entriesCollection.add({
      serial_id: user.serial_id,
      name: user.name,
      dni: user.dni,
      date: new Date(),
    });
  };

  const findUserByDni = async (dni) => {
    const querySnapshot = await usersCollection.where("dni", "==", dni).get();
    if (querySnapshot.size > 0) {
      const user = querySnapshot.docs[0].data();
      return user;
    } else {
      return null;
    }
  };

  const findLastEntryDateByDni = async (dni) => {
    console.log(dni);
    const querySnapshot = await entriesCollection.orderBy("date", "desc").get();
    if (querySnapshot.size > 0) {
      const lastEntry = querySnapshot.docs.find((x) => {
        return x.data().dni === dni;
      });
      const lastDate = lastEntry.data().date.toDate();
      return lastDate;
    } else {
      return null;
    }
  };

  const findUserByNFCTag = async (nfcTag) => {
    const userDoc = await usersCollection.doc(nfcTag).get();
    const data = userDoc.data();
    return data;
  };

  return {
    findUserByDni,
    findUserByNFCTag,
    findLastEntryDateByDni,
    addUserEntry,
  };
};
