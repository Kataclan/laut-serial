import React from "react";
import { View, Image, Button, Text } from "react-native";
import useNFCManager from "./src/hooks/useNFCManager";

const App = ({}) => {
  const { tag, initNFC, readNFC } = useNFCManager();

  const readTag = async () => {
    initNFC();
    readNFC();
  };

  return (
    <View
      style={{
        padding: 20,
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
      <Button
        title="SCAN SERIAL"
        color="#002bfe"
        style={{ width: 200 }}
        onPress={readTag}
      ></Button>

      {tag && (
        <Text style={{ color: "#ffffff", marginTop: 50, alignSelf: "center" }}>
          SERIAL ID: {tag.id}
        </Text>
      )}
    </View>
  );
};

App.defaultProps = {};

App.propTypes = {};

export default App;
