import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import Sound from "react-native-sound";
const soundList = [
  require("./assets/one.wav"),
  require("./assets/two.wav"),
  require("./assets/three.wav"),
  require("./assets/four.wav"),
  require("./assets/five.wav"),
  require("./assets/six.wav"),
  require("./assets/seven.wav"),
  require("./assets/eight.wav"),
  require("./assets/nine.wav"),
  require("./assets/ten.wav")
];
const App = () => {
  const playSound = sound => {
    var soundVar = new Sound(sound, Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log("failed to load the sound", error);
        return;
      }
    });

    setTimeout(() => {
      soundVar.play();
    }, 1000);

    soundVar.release();
  };
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.logo} source={require("./assets/logo.png")} />

      <View style={styles.gridContainer}>
        {soundList.map(sound => (
          <TouchableOpacity
            key={sound}
            onPress={() => {
              playSound(sound);
            }}
            style={styles.box}
          >
            <Text style={styles.text}>{sound}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#1b262c"
  },
  logo: {
    alignSelf: "center",
    marginTop: 50
  },
  gridContainer: {
    flex: 1,
    margin: 5,
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-around"
  },
  box: {
    height: 110,
    width: "46%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
    backgroundColor: "#0f4c75"
  },
  text: {
    fontSize: 50,
    color: "#ff4301"
  }
});
