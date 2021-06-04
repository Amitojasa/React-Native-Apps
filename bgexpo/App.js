import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";

const App = () => {
  const [randomColor, setrandomColor] = useState("rgb(36,43,46)");
  const [randomHexColor, setrandomHexColor] = useState("#242B2E");

  const changeBackground = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let s = "rgb(" + r + "," + g + "," + b + ")";
    setrandomHexColor(rgb2Hex(s));
    setrandomColor(s);
  };

  const resetBackground = () => {
    let s = "rgb(0,0,0)";

    setrandomColor(s);
    setrandomHexColor(rgb2Hex(s));
  };

  const rgb2Hex = s => {
    let s1 = s
      .match(/[0-9]+/g)
      .reduce((a, b) => a + (b | 256).toString(16).slice(1), "#");
    return s1.toUpperCase();
  };

  return (
    <>
      <StatusBar backgroundColor="#000" />
      <View style={[styles.container, { backgroundColor: randomColor }]}>
        <TouchableOpacity onPress={changeBackground}>
          <Text style={[styles.text, { backgroundColor: "#E03B8B" }]}>
            Tap Me
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={resetBackground}>
          <Text style={[styles.text, { backgroundColor: "#758283" }]}>
            Reset
          </Text>
        </TouchableOpacity>
        <View style={styles.textview}>
          <Text style={styles.simpletext}>RGB Code : {randomColor}</Text>
        </View>
        <View style={styles.textview}>
          <Text style={styles.simpletext}>Hex Code : {randomHexColor}</Text>
        </View>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  text: {
    fontSize: 30,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 15,
    color: "#FFFFFF",
    marginVertical: 20
  },
  simpleText: {
    fontSize: 20,
    // paddingHorizontal: 40,
    // paddingVertical: 50,
    color: "#FFFFFF"
    // marginVertical: 40
  },
  textview: {
    marginVertical: 10
  }
});
