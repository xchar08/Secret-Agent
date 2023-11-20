import { StatusBar } from 'expo-status-bar';
import { ImageBackground, ActivityIndicator, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/components/LoginPage'
import SplashScreen from './src/components/SplashScreen'
import SignUpScreen from './src/components/SignUpScreen'
import PlayScreen from './src/components/PlayScreen';
import GameLobby from './src/components/GameLobby';
import CreateGame from './src/components/CreateGameScreen';
import JoinGame from './src/components/JoinGameScreen';
import GameScreen from './src/components/GameScreen';
import { getAuth, signInAnonymously } from "firebase/auth";
import firebaseApp from './src/environments/config';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


signInAnonymously(auth)
  .then((value) => {
    console.log(value.user.getIdToken());
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });


const Stack = createNativeStackNavigator();

export default function App() {

  /*auth.onAuthStateChanged((user)=>{
   console.log(user); 
  });
*/


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GameLobby">
      <Stack.Screen name="GameLobby" component={GameLobby} />
      <Stack.Screen name="CreateGame" component={CreateGame} />
      <Stack.Screen name="JoinGame" component={JoinGame} />
      <Stack.Screen name="GameScreen" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    /*
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="PlayScreen" component={PlayScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>

    */
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});