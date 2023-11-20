import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import cityscape from '../assets/cityscape.jpg';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { GoogleAuthProvider, getAuth, signInAnonymously, signInWithCredential } from "firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { sessionStart } from '../services/api.service';
import firebaseApp from '../environments/config';

import {GameContext} from '../services/gameState';

const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default function LoginPage({ navigation }) {

  const game = useContext(GameContext);
  //disable the google sign in button after clicking signin
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  //const [idToken, setIdToken] = useState(null);
  //must be called before signing in 

  //web client id came from firebase authentication
  GoogleSignin.configure({
    webClientId: '739597303932-jl2p9mkue1412upfn4dqk2kf1o95lr0i.apps.googleusercontent.com'

  });


  //function handler for the google sign in click
  function handleSignIn() {
    setIsSigninInProgress(true);
    signIn();
  }


  //function that calls the google sign in web screen
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = GoogleAuthProvider.credential(userInfo.idToken);
      const firebaseUser = await signInWithCredential(getAuth(), credential);
      let token = await firebaseUser.user.getIdToken();
      //console.log(token);
      let userProfile = await sessionStart(token);
      //console.log(userProfile);
      setIsSigninInProgress(false);
      game.idToken = token;
      game.profile = userProfile;
      navigation.navigate('GameLobby');

    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    
      <ImageBackground source={cityscape} resizeMode="cover" style={styles.image}>
        <View style={styles.login}>
          <Text style={styles.text}>Login</Text>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleSignIn}
            disabled={isSigninInProgress}
          />
        </View>
      </ImageBackground>
 
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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

  input: {
    borderColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 0,
    color: 'white',
    padding: 10,
    paddingLeft: 15,
    backgroundColor: 'transparent',
  },

  login: {
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 35,
    backgroundColor: '#000000c0',
    backgroundOpacity: 0.5,
    backdropFilter: 'blur(80px)',
    padding: 5,
    margin: 10,
    paddingBottom: 60,
  },

  loginButton: {
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
    color: 'black',
    fontSize: 18,
    //lineHeight: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

})