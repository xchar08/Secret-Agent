import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import { sessionDebug } from '../services/api.service';
import { AuthContext, HostContext } from '../services/gameState';

import {firebase as authProvider} from '@react-native-firebase/auth';

const FIREBASE_AUTH = authProvider.auth();


export default function GameLobby({ navigation }) {
  const {user, setUser} = useContext(AuthContext);
  const {host, setHost} = useContext(HostContext);

  const image = user.profile?.picture ?? user.profile?.photoURL;

  if (image === null)
  {
    FIREBASE_AUTH.signOut();
  }
 
  const [sessions, setSessions] = useState([]);
  const [didStart, setDidStart] = useState(false);
  const [sessionLength, setSessionLength] = useState(0);
  useEffect((() => {
    async function getSession() {

      const response = (await sessionDebug());
    
      setSessions(response.payload);
      setDidStart(true);
      setSessionLength(Object.keys(response.payload).length);
    }

    if (!didStart) {
      getSession();
    }

  }), [])


  const handleCreateGame = () => {
    setHost(true);
    navigation.navigate('CreateGame');
  };

  const handleJoinGame = () => {
    setHost(false);
    navigation.navigate('JoinGame');
  };

  return (
    <View style={styles.container}>
      {didStart && <Text>{sessionLength} Online Users:</Text>}
      <ImageBackground source={bluebackground} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Secret Message</Text>

        {image && <Image source={{ uri: image }} style={styles.profileImage} />}
        { user.profile?.name !== null && <Text style={styles.userName}>Welcome {user.profile?.name}</Text>}
        <TouchableOpacity style={styles.GameLobbyButton} onPress={handleCreateGame}
          color="#841584"
        >
          <Text style={styles.buttonText}>Create Game</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.GameLobbyButton} onPress={handleJoinGame}
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

  profileImage: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'stretch'

  },

  userName: {
    color: 'white',
    fontSize: 21,
    lineHeight: 42,
    fontWeight: 'bold',
    textAlign: 'center',

    marginLeft: 20,
    marginRight: 20,
  }


});