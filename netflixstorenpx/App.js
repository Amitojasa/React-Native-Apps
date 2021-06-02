import 'react-native-gesture-handler';
import { } from 'native-base'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';




/// bring all screens

import Home from './screens/Home';
import Add from './screens/Add';
import Edit from './screens/Edit';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: "#0f4c75"

            },
            title: 'Netflix App',
            headerTitleStyle: {
              alignSelf: "center",
              color: 'white'
            }
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerStyle: {
              backgroundColor: "#0f4c75"

            },
            title: 'Add show',
            headerTitleStyle: {
              alignSelf: "center",
              color: 'white'
            }
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            headerStyle: {
              backgroundColor: "#0f4c75"

            },
            title: 'Edit show',
            headerTitleStyle: {
              alignSelf: "center",
              color: 'white'
            }
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
