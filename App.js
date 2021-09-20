import React from "react";
import propTypes from "prop-types";
import { View, Image, Text, ActivityIndicator, TextInput } from "react-native";
import useAppState from "./src/hooks/useAppState";
import Button from "./src/components/Button";
import LautLogo from "./src/img/laut_main.png";

const AppHeader = ({ children }) => (
  <View style={{ display: "flex" }}>{children}</View>
);
const AppBody = ({ children }) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      flexGrow: 1,
      alignItems: "center",
    }}
  >
    {children}
  </View>
);

AppHeader.defaultProps = {
  children: null,
};
AppHeader.propTypes = {
  children: propTypes.node,
};

AppBody.defaultProps = {
  children: null,
};
AppBody.propTypes = {
  children: propTypes.node,
};

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
      case appStates.init:
        return (
          <View
            style={{
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: "#ffffff", alignSelf: "center", fontSize: 25 }}
            >
              INICIANDO
            </Text>
            <ActivityIndicator
              style={{ marginTop: 50 }}
              color="#ffffff"
              size={50}
            />
          </View>
        );
      case appStates.start:
        return (
          <View
            style={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: 60,
            }}
          >
            <Button
              touchableStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#002bfe",
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
              contained={true}
              touchableStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                marginTop: 20,
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
              flexGrow: 1,
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
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#b04867",
                marginTop: 50,
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
      case appStates.disconnected:
        return (
          <View
            style={{
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "red",
                alignSelf: "center",
                fontSize: 25,
                textAlign: "center",
                paddingRight: 10,
                paddingLeft: 10,
              }}
            >
              No hay conexión a internet
            </Text>
          </View>
        );

      case appStates.registering:
      case appStates.fetching:
        return (
          <View
            style={{
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: "#ffffff", alignSelf: "center", fontSize: 25 }}
            >
              {appState === appStates.fetching
                ? "COMPROBANDO DATOS"
                : "REGISTRANDO USUARIO"}
            </Text>
            <ActivityIndicator
              style={{ marginTop: 50 }}
              color="#ffffff"
              size={50}
            />
            <Button
              contained={true}
              touchableStyle={{
                display: "flex",
                flex: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#b04867",
                marginTop: 50,
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
              text={
                appState === appState.fetching
                  ? "CANCELAR LECTURA"
                  : "CANCELAR REGISTRO"
              }
              textStyle={{ fontSize: 18, color: "#ffffff" }}
            />
          </View>
        );

      case appStates.manualRegistration:
        return (
          <View
            style={{
              display: "flex",
              flexGrow: 1,
              paddingBottom: 60,
              alignItems: "center",
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

            <View style={{ display: "flex", flexGrow: 1 }} />
            <Button
              touchableStyle={{
                display: "flex",
                flex: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#002bfe",
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
              contained={true}
              touchableStyle={{
                display: "flex",
                flex: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                marginTop: 20,
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
              flexGrow: 1,
              paddingBottom: 60,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                alignSelf: "center",
                fontSize: 25,
              }}
            >
              SERIAL ID: {user.serial_id}
            </Text>
            <Text
              style={{
                color: "#ffffff",
                marginTop: 20,
                alignSelf: "center",
                fontSize: 25,
              }}
            >
              DNI: {user.dni}
            </Text>
            <Text
              style={{
                color: "#ffffff",
                marginTop: 20,
                alignSelf: "center",
                fontSize: 25,
              }}
            >
              NOMBRE: {user.name}
            </Text>

            <View style={{ display: "flex", flexGrow: 1 }} />
            <Button
              touchableStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#6fbf73",
                alignSelf: "flex-end",
                marginTop: 20,
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
              contained={true}
              touchableStyle={{
                display: "flex",
                alignSelf: "flex-end",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#b04867",
                marginTop: 20,
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
        flex: 1,
        backgroundColor: "black",
        justifyContent: "space-around",
      }}
    >
      <AppHeader>
        <Image
          source={LautLogo}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
      </AppHeader>
      <AppBody>{view()}</AppBody>
    </View>
  );
};

App.defaultProps = {};

App.propTypes = {};

export default App;
