import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import DiceOne from './assets/dice1.png';
import DiceTwo from './assets/dice2.png';
import DiceThree from './assets/dice3.png';
import DiceFour from './assets/dice4.png';
import DiceFive from './assets/dice5.png';
import DiceSix from './assets/dice6.png';

function App() {
  const [dice, setDice] = useState(DiceOne);
  const [no, setNo] = useState(1);

  const rollButtonTapped = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    setNo(randomNumber);
    switch (randomNumber) {
      case 1:
        setDice(DiceOne);

        break;
      case 2:
        setDice(DiceTwo);

        break;
      case 3:
        setDice(DiceThree);

        break;
      case 4:
        setDice(DiceFour);

        break;
      case 5:
        setDice(DiceFive);

        break;
      case 6:
        setDice(DiceSix);

        break;
      default:
        setDice(DiceOne);

        break;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={dice} />
        <TouchableOpacity onPress={rollButtonTapped}>
          <Text style={styles.rollbtn}>Roll Now</Text>
        </TouchableOpacity>
        <Text style={styles.rollbtn}>{no}</Text>
      </View>
    </>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  rollbtn: {
    fontSize: 20,
    marginTop: 30,
    color: '#F2A365',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 3,
    fontWeight: 'bold',
  },
});
