import React from "react";
import { View, Image, Text, ActivityIndicator, TextInput } from "react-native";
import useAppState from "./src/hooks/useAppState";
import Button from "./src/components/Button";

const App = () => {
  const {
    appStates,
    appState,
    dni,
    user,
    readCard,
    getUserByDNI,
    acceptUser,
    setAppState,
    resetAppState,
  } = useAppState();

  const onClickReadCard = async () => {
    readCard();
  };

  const view = () => {
    switch (appState) {
      case appStates.start:
        return (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              touchableStyle={{
                display: "flex",
                flex: 0,
                width: 250,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#002bfe",
                padding: 25,
                marginTop: 100,
                borderRadius: 5,
              }}
              onPress={onClickReadCard}
              viewStyle={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              icon="md-card"
              iconColor="white"
              iconSize={18}
              text="LEER TARJETA"
              textStyle={{ fontSize: 18, color: "#ffffff" }}
            />
            <Button
              touchableStyle={{
                display: "flex",
                flex: 0,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                padding: 25,
                marginTop: 40,
                borderRadius: 5,
              }}
              onPress={() => {
                setAppState({ appState: appStates.manualRegistration });
              }}
              viewStyle={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              icon="md-search"
              iconColor="white"
              iconSize={18}
              text="BUSQUEDA MANUAL"
              textStyle={{ fontSize: 18, color: "#ffffff" }}
            />
          </View>
        );

      case appStates.reading:
        return (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: "#ffffff", alignSelf: "center", fontSize: 25 }}
            >
              ACERCA LA TARJETA
            </Text>
            <ActivityIndicator
              style={{ marginTop: 50 }}
              color="#ffffff"
              size={50}
            />
            <Button
              touchableStyle={{
                display: "flex",
                flex: 0,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#b04867",
                padding: 25,
                marginTop: 40,
                borderRadius: 5,
              }}
              onPress={resetAppState}
              viewStyle={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              icon="md-close"
              iconColor="white"
              iconSize={18}
              text="CANCELAR LECTURA"
              textStyle={{ fontSize: 18, color: "#ffffff" }}
            />
          </View>
        );

      case appStates.manualRegistration:
        return (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, color: "#ffffff", marginBottom: 20 }}>
              Introduce el DNI
            </Text>
            <TextInput
              style={{
                width: 250,
                display: "flex",
                color: "black",
                backgroundColor: "white",
              }}
              placeholder="DNI"
              value={dni}
              onChangeText={(text) => {
                setAppState({ dni: text });
              }}
            />
            <Button
              touchableStyle={{
                display: "flex",
                flex: 0,
                width: 250,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#002bfe",
                padding: 25,
                marginTop: 50,
                borderRadius: 5,
              }}
              onPress={getUserByDNI}
              viewStyle={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              icon="md-search"
              iconColor="white"
              iconSize={18}
              text="BUSCAR USUARIO"
              textStyle={{ fontSize: 18, color: "#ffffff" }}
            />
            <Button
              touchableStyle={{
                display: "flex",
                flex: 0,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                padding: 25,
                marginTop: 40,
                borderRadius: 5,
              }}
              onPress={resetAppState}
              viewStyle={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              iconSize={18}
              text="ATRÁS"
              textStyle={{ fontSize: 18, color: "#ffffff" }}
            />
          </View>
        );

      case appStates.verifying:
        return (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                marginTop: 10,
                alignSelf: "center",
                fontSize: 25,
              }}
            >
              SERIAL ID: {user.serial_id}
            </Text>
            <Text
              style={{
                color: "#ffffff",
                marginTop: 50,
                alignSelf: "center",
                fontSize: 25,
              }}
            >
              DNI: {user.dni}
            </Text>
            <Text
              style={{
                color: "#ffffff",
                marginTop: 50,
                alignSelf: "center",
                fontSize: 25,
              }}
            >
              NOMBRE: {user.name}
            </Text>
            <Button
              touchableStyle={{
                display: "flex",
                flex: 0,
                width: 250,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#6fbf73",
                padding: 25,
                marginTop: 50,
                borderRadius: 5,
              }}
              onPress={acceptUser}
              viewStyle={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              icon="md-checkmark-circle"
              iconColor="white"
              iconSize={32}
              text="ACEPTAR"
              textStyle={{ fontSize: 18, color: "#ffffff" }}
            />
            <Button
              touchableStyle={{
                display: "flex",
                flex: 0,
                width: 250,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#b04867",
                padding: 25,
                marginTop: 40,
                borderRadius: 5,
              }}
              onPress={resetAppState}
              viewStyle={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              icon="md-close"
              iconColor="white"
              iconSize={32}
              text="CANCELAR"
              textStyle={{ fontSize: 18, color: "#ffffff" }}
            />
          </View>
        );
    }
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
          uri: "https://scontent-mad1-1.xx.fbcdn.net/v/t1.6435-9/49277788_2393459380695586_5606288624707436544_n.png?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=4cMQ2UN9TmAAX9AELQF&_nc_ht=scontent-mad1-1.xx&oh=b70355e008f6eda77c7c130774428a13&oe=6091F0A6",
        }}
        style={{ width: 200, height: 200, alignSelf: "center" }}
      />
      {view()}
    </View>
  );
};

App.defaultProps = {};

App.propTypes = {};

export default App;
