import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'native-base'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';


import Axios from 'axios'
import User from './components/User';


const App = () => {
  // const key = "randomkey123"
  // var URL = `https://randomuser.me/api/${key}/params`
  var URL = "https://randomuser.me/api/"
  const [details, setDetails] = useState(null)

  useEffect(() => {
    fetchDetails();
  }, [])

  const fetchDetails = async () => {
    try {

      const { data } = await Axios.get(URL)
      const details = data.results[0]
      // console.log(details)

      setDetails(details)

    } catch (error) {
      console.log(error);
    }
  }


  if (!details) {
    return <View style={styles.container}><Spinner /></View>
  } else {

    return (
      <View style={styles.container}>
        <View>
          <User details={details} />
        </View>
        <View>
          <Button rounded style={styles.button} onPress={fetchDetails}><Text>New User</Text></Button>
        </View>
      </View>
    )
  }
}

export default App


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#222831"
  },
  button: {
    marginTop: 30,
    paddingHorizontal: 30,


  }
})