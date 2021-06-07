import React, { useState } from "react";
import { Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";

import DiceOne from "./assets/dice1.png";
import DiceTwo from "./assets/dice2.png";
import DiceThree from "./assets/dice3.png";
import DiceFour from "./assets/dice4.png";
import DiceFive from "./assets/dice5.png";
import DiceSix from "./assets/dice6.png";

const App = () => {
  const [uri, setUri] = useState(DiceOne);
  const diceArray = [DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix];

  const rollDice = () => {
    let a = Math.floor(Math.random() * 6);

    setUri(diceArray[a]);
  };

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={uri} />

        <TouchableOpacity onPress={rollDice}>
          <Text style={styles.playButton}> Play Game </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222831"
  },
  playButton: {
    fontSize: 20,
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderColor: "#E07C24",
    borderWidth: 3,
    borderRadius: 5,
    fontWeight: "bold"
  },
  image: {
    width: 200,
    height: 200
  }
});
