import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import cityscape from '../assets/cityscape.jpg';


export default function SignUpScreen({ navigation }) {

  const auth = FIREBASE_AUTH;


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Account created!');
    } catch (error) {
      console.log(error);
      alert('signUp failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={cityscape} resizeMode="cover" style={styles.image}>



        <View style={styles.login}>
          <Text style={styles.text}>Sign Up</Text>

          <TextInput
            onChangeText={text => setEmail(text)}
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


          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <TouchableOpacity style={styles.loginButton} onPress={() => signUp()}>
              <Text style={styles.buttonText}>
                Create Account
              </Text>
            </TouchableOpacity>
          )}

        </View>

      </ImageBackground>
      <StatusBar style="auto" />
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

  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',

    marginLeft: 20,
    marginRight: 20,
  },


})