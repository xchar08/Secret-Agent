import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity, Button } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

export default function GameLobby({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={bluebackground} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Secret Message</Text>

        <TouchableOpacity style={styles.GameLobbyButton} onPress={() => navigation.navigate('CreateGame')}
          color="#841584"
        >
          <Text style={styles.buttonText}>Create Game</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.GameLobbyButton} onPress={() => navigation.navigate('JoinGame')}
          color="#841584"
        >
          <Text style={styles.buttonText}>Join Game</Text>
        </TouchableOpacity>

        <Button onPress={() => FIREBASE_AUTH.signOut()} title="logout"></Button>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  image: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'stretch',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',

    marginLeft: 20,
    marginRight: 20,
  },
  GameLobbyButton: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'darkblue',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },


})