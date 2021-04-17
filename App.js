import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, ToastAndroid, ActivityIndicator, TextInput } from "react-native";
import firestore from '@react-native-firebase/firestore';
import useNFCManager from "./src/hooks/useNFCManager";
import Animated from "react-native-reanimated";

const App = ({}) => {
  const usersCollection = firestore().collection('users');
  const entriesCollection = firestore().collection('entries');
  const [reading, setReading] = useState(false);
  const [dni, setDni] = useState("");
  const [manual, setManual] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { tag, initNFC, readNFC } = useNFCManager();
  

  const readTag = async () => {
    initNFC();
    readNFC();
    setReading(true);
  };

  useEffect(() => {
    const getUser = async (nfcTag) => {
      try{
        const userDoc = await usersCollection.doc(nfcTag).get();
        const data = userDoc.data();
        if (data){
          setUser(data);
        } else {
          setError('TARJETA NO REGISTRADA');
        }
      }catch (e){
        console.log('ERROR ON GET USER', e);
        setError('USUARIO NO ENCONTRADO');
      }
      setReading(false);
    };
    if (tag !== null){
      setError(null);
      getUser(tag.id);
    }
  }, [tag]);

  const acceptUser = async () => {
    await entriesCollection.add({
      serial_id: user.serial_id,
      name: user.name,
      dni: user.dni,
      date: new Date(),
    });
    setUser(null);
    setReading(false);
    ToastAndroid.show("Usuario registrado correctamente", ToastAndroid.SHORT);
  }

  const getUserByDni = async (dni) => {
    try{
      console.log(dni);
      const query = await usersCollection.where("serial_id", "==", "3");
      console.log(query.docs[0].data());
      setUser(data);
    } catch (e){
       setError('USUARIO NO ENCONTRADO');
    }
    setManual(false);
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 20,
        paddingBottom: 200,
        backgroundColor: "black",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        source={{
          uri:
            "https://scontent-mad1-1.xx.fbcdn.net/v/t1.6435-9/49277788_2393459380695586_5606288624707436544_n.png?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=4cMQ2UN9TmAAX9AELQF&_nc_ht=scontent-mad1-1.xx&oh=b70355e008f6eda77c7c130774428a13&oe=6091F0A6",
        }}
        style={{ width: 200, height: 200, alignSelf: "center" }}
      />
      {
        manual ? <View style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
          <TextInput style={{ width: 300, display: "flex", color: "black", backgroundColor: "white"}} placeholder="DNI" value={dni} onChangeText={setDni} />
          <TouchableOpacity
            style={{
              display: 'flex',
              flex: 0,
              width: 300,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#002bfe',
              padding: 25,
              marginTop: 200,
              borderRadius: 5,
            }}
            onPress={() => { usersCollection.where('dni', '==', dni)
              .get().then(function(querySnapshot) {
                  if (querySnapshot.size > 0) {
                    // Contents of first document
                    setUser(querySnapshot.docs[0].data());
                  } else {
                    console.log("No such document!");
                  }
                  setManual(false);
                })
                .catch(function(error) {
                  console.log("Error getting document: ", error);
                  setManual(false);
                }); 
              }}>
            <Text style={{ fontSize: 18, color: "#ffffff"}}>BUSCAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={{
                display: 'flex',
                flex: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#b04867',
                padding: 25,
                marginTop: 40,
                borderRadius: 5,
                width: 300,
              }}
              onPress={() => { setManual(false)}}>
              <Text style={{ fontSize: 18, color: "#ffffff"}}>CANCELAR</Text>
            </TouchableOpacity>
        </View>
        :
        user !== null ? <View style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Text style={{ color: "#ffffff", marginTop: 50, alignSelf: "center",  fontSize: 25 }}>
              SERIAL ID: {user.serial_id}
          </Text>
          <Text style={{ color: "#ffffff", marginTop: 50, alignSelf: "center",  fontSize: 25}}>
              DNI: {user.dni}
          </Text>
          <Text style={{ color: "#ffffff", marginTop: 50, alignSelf: "center",  fontSize: 25 }}>
              NOMBRE: {user.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              height: 100,
              padding: 20,
              marginTop: 50
            }}
          >
            <TouchableOpacity
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#002bfe',
                padding: 10,
                marginRight: 25
              }}
              onPress={acceptUser}>
              <Text style={{  color: "#ffffff"}}>ACEPTAR USUARIO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#b04867',
                padding: 10,
              }}
              onPress={() => {setUser(null)}}>
              <Text style={{color: "#ffffff", fontWeight: "bold"}}>RECHAZAR USUARIO</Text>
            </TouchableOpacity>
          </View>
        </View> :
        reading ?  
          <View style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Text style={{ color: "#ffffff", alignSelf: "center", fontSize: 25 }}>
              ACERCA LA TARJETA
            </Text>
            <ActivityIndicator style={{ marginTop: 50}} color="#ffffff" size={50}/>
            <TouchableOpacity
              style={{
                display: 'flex',
                flex: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#b04867',
                padding: 25,
                marginTop: 100,
                borderRadius: 5,
                width: 300,
              }}
              onPress={() => { setReading(false)}}>
              <Text style={{ fontSize: 18, color: "#ffffff"}}>CANCELAR LECTURA</Text>
            </TouchableOpacity>
          </View> 
        :

        <View style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
          {error && <Text style={{ marginTop: 100, color: "red", fontSize: 25}}>{error}</Text>}
          <TouchableOpacity
            style={{
              display: 'flex',
              flex: 0,
              width: 300,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#002bfe',
              padding: 25,
              marginTop: 100,
              borderRadius: 5,
            }}
            onPress={readTag}>
            <Text style={{ fontSize: 18, color: "#ffffff"}}>LEER TARJETA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: 'flex',
              flex: 0,
              width: 300,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#002bfe',
              padding: 25,
              marginTop: 40,
              borderRadius: 5,
            }}
            onPress={() => { setManual(true); }}>
            <Text style={{ fontSize: 18, color: "#ffffff"}}>BUSCAR MIEMBRO</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

App.defaultProps = {};

App.propTypes = {};

export default App;
