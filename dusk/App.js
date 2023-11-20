import { StatusBar } from 'expo-status-bar';
import { ImageBackground, ActivityIndicator, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/components/LoginPage'
import SplashScreen from './src/components/SplashScreen'
import SignUpScreen from './src/components/SignUpScreen'
import GameLobby from './src/components/GameLobby';
import CreateGame from './src/components/CreateGameScreen';
import JoinGame from './src/components/JoinGameScreen';
import GameScreen from './src/components/GameScreen';
import { User, onAuthStateChanged } from 'firebase/auth'; //User object IMPORTANT
import { FIREBASE_AUTH } from './FirebaseConfig';


const AuthStack = createNativeStackNavigator();
const GameStack = createNativeStackNavigator();

//There are TWO seperate stack navigators. Only a verified, logged in user can access the GameNavigator 
const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="SplashScreen">
    <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
    <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <AuthStack.Screen name="LoginPage" component={LoginPage} />
  </AuthStack.Navigator>
);

const GameNavigator = () => (
  <GameStack.Navigator initialRouteName="GameLobby">
    <GameStack.Screen name="GameLobby" component={GameLobby} />
    <GameStack.Screen name="CreateGame" component={CreateGame} />
    <GameStack.Screen name="JoinGame" component={JoinGame} />
    <GameStack.Screen name="GameScreen" component={GameScreen} />
  </GameStack.Navigator>
);

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);

  //Decide which stack navigator to call based on whether or not user is logged in
  return (
    <NavigationContainer>
      {user ? <GameNavigator /> : <AuthNavigator />}
    </NavigationContainer>
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