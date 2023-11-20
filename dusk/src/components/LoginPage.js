import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import cityscape from '../assets/cityscape.jpg';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => { //not used in this screen, used in SignUpScreen.js
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }



  return (
    <ImageBackground source={cityscape} resizeMode="cover" style={styles.image}>
      <View style={styles.login}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.text}>Login</Text>

          <TextInput
            onChangeText={text => setEmail(text)}
            value={email}
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="white"

          />
          <TextInput
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="white"
          />


          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('SignUpScreen')}

            color="#841584"
            accessibilityLabel="Learn more about this purple button"

          >
            <Text style={styles.buttonText}>
              Create Account
            </Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <TouchableOpacity style={styles.loginButton} onPress={() => signIn()}>
              <Text style={styles.buttonText}>
                Login
              </Text>
            </TouchableOpacity>
          )}

        </KeyboardAvoidingView>
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