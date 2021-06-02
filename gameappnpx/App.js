import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icons from './components/Icons.js'
import {
  Container, Title, Text, Content, Header, Body, Card, H1, H3, Button
} from 'native-base'

import Snackbar from 'react-native-snackbar'

const itemArray = new Array(9).fill('empty')

const App = () => {

  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState('');



  const reloadGame = () => {
    setIsCross(false);
    setWinMessage(null);
    itemArray.fill('empty');
  }

  const checkIsWinner = () => {
    if (itemArray[0] != 'empty' && itemArray[0] === itemArray[1] && itemArray[1] === itemArray[2]) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (itemArray[3] != 'empty' && itemArray[3] === itemArray[4] && itemArray[4] === itemArray[5]) {
      setWinMessage(`${itemArray[3]} won`);
    } else if (itemArray[6] != 'empty' && itemArray[6] === itemArray[7] && itemArray[7] === itemArray[8]) {
      setWinMessage(`${itemArray[6]} won`);
    } else if (itemArray[0] != 'empty' && itemArray[3] === itemArray[0] && itemArray[3] === itemArray[6]) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (itemArray[1] != 'empty' && itemArray[1] === itemArray[4] && itemArray[4] === itemArray[7]) {
      setWinMessage(`${itemArray[1]} won`);
    } else if (itemArray[2] != 'empty' && itemArray[2] === itemArray[5] && itemArray[5] === itemArray[8]) {
      setWinMessage(`${itemArray[2]} won`);
    } else if (itemArray[0] != 'empty' && itemArray[0] === itemArray[4] && itemArray[4] === itemArray[8]) {
      setWinMessage(`${itemArray[4]} won`);
    } else if (itemArray[2] != 'empty' && itemArray[2] === itemArray[4] && itemArray[4] === itemArray[6]) {
      setWinMessage(`${itemArray[4]} won`);
    }


    if (!winMessage) {
      let i = 0;
      for (i = 0; i < 9; i++) {
        if (itemArray[i] == 'empty') {
          break;
        }
      }

      if (i == 9) {
        setWinMessage("Game Tie");
      }
    }



  }
  const changeItem = (itemNumber) => {

    if (winMessage) {
      return Snackbar.show({
        text: winMessage,
        backgroundColor: "#000",
        textColor: "#FFF"
      })
    }


    if (itemArray[itemNumber] === 'empty') {
      itemArray[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);


    } else {
      return Snackbar.show({
        text: "Position is already filled",
        backgroundColor: "red",
        textColor: "#FFF"
      })
    }
    checkIsWinner();


  }
  return (

    <Container style={{ backgroundColor: "#333945", padding: 5 }}>
      <Header>
        <Body>
          <Title>Tic Tac Toe</Title>
        </Body>
      </Header>
      <Content>
        <View style={styles.grid}>

          {itemArray.map((item, index) => (
            <TouchableOpacity style={styles.box} key={index} onPress={() => changeItem(index)}>

              <Card style={styles.card}>
                <Icons name={item} />
              </Card>

            </TouchableOpacity>
          ))}
        </View>
        {winMessage ? (
          <View>
            <H1 style={styles.message}>{winMessage}</H1>
            <Button onPress={reloadGame} primary block rounded><Text>Reload Game</Text></Button>
          </View>) : (
          <View>
            <H3 style={styles.message}>
              {
                isCross ? 'cross' : 'circle'
              } turn

              </H3>
          </View>
        )

        }
      </Content>
    </Container>

  )
}

export default App;

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20
  },
  box: {
    width: '33%',
    marginBottom: 6
  },
  card: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "#FFF",
    marginTop: 20,
    backgroundColor: "#4652B3",
    paddingVertical: 10,
    marginVertical: 10
  }
})



