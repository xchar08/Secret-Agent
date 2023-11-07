import { StatusBar } from 'expo-status-bar';
import { ImageBackground, ActivityIndicator, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import React, {useState} from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './src/components/LoginPage'
import SplashScreen from './src/components/SplashScreen'
import SignUpScreen from './src/components/SignUpScreen'
import PlayScreen from './src/components/PlayScreen';

export default function App(){
  return (
    //<NavigationContainer> Dont uncomment the NavigationCode yet
    <LoginPage></LoginPage>
    //<SplashScreen></SplashScreen>
    //<SignUpScreen></SignUpScreen>
    //<PlayScreen></PlayScreen>
    //</NavigationContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});