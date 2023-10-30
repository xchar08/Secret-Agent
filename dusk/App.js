//import { spawnSync } from 'child_process';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, ActivityIndicator, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import React, {useState} from 'react';
import cityscape from './assets/cityscape.jpg';
import sunset_cityscape from './assets/sunset_cityscape.jpg';
import dark_cityscape from './assets/dark_cityscape.jpg';

export default function App(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoggedIn, setLoggedIn] = useState(false);

  const PressLoginScreen = () => {
    console.log('Login Screen Pressed');
    setCurrView("login");
  }
  const PressSignUpScreen = () => {
    console.log('SignUp Pressed');
    setCurrView("signup-screen");
  }

  const PressLogin = () => {
    console.log('Log In Pressed');
    setLoggedIn(true);
    setCurrView("play");
  }
  const PressSignup = () => {
    console.log('Sign Up Pressed');
    setCurrView("home");
  }

  /*const PressSpinner = () => {
    console.log('Transition to Spinner');
    setCurrView("home");
  }*/
  const PressPlay = () => {
    console.log('Play Pressed');
    setCurrView("play");
  }

  const PressHome = () => {
    console.log('Home Pressed');
    setCurrView("home");
  }

  function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(email);
    console.log(password);
      // Here, you can handle the signup process, such as sending the data to an API or performing client-side validation.
      // You can access the stored data in the 'name', 'email', and 'password' variables.
  }
  function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(email);
    console.log(password);
      // Here, you can handle the signup process, such as sending the data to an API or performing client-side validation.
      // You can access the stored data in the 'name', 'email', and 'password' variables.
  }

  const [isSelected, setSelection] = useState(false);

  const [currView, setCurrView] = useState("home");

  return (<> 
  
    {currView === "login" &&
      <View style={styles.container}>
        <ImageBackground source={cityscape} resizeMode="cover" style={styles.image}>


          <View style={styles.login}>
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
              value={password}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="white"
            />


            
            <TouchableOpacity style={styles.loginButton} onPress={PressLogin}
              
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              
            >
            <Text style={styles.buttonText}>
              Login
            </Text>  
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={PressSignUpScreen}
              
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              
            >
            <Text style={styles.buttonText}>
              Create Account
            </Text>  
            </TouchableOpacity>
              

          </View>

        </ImageBackground>
        <StatusBar style="auto" />  
      </View>
    }
    {currView === "signup-screen" &&
      <View style={styles.container}>
        <ImageBackground source={cityscape} resizeMode="cover" style={styles.image}>


          <View style={styles.login}>
            <Text style={styles.text}>Sign Up</Text>

            <TextInput 
              style={styles.input}
              placeholder="Email" 
              placeholderTextColor="white"
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="white"
            />
            
            <TouchableOpacity style={styles.loginButton} onPress={PressSignup}
              
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              
            >
            <Text style={styles.buttonText}>
              Create Account
            </Text>  
            </TouchableOpacity>
              

          </View>

        </ImageBackground>
        <StatusBar style="auto" />  
      </View>
    }
    {currView === "spinner" &&
      <View style={styles.container}>
        <ImageBackground source={sunset_cityscape} resizeMode="cover" style={styles.image}>

          <TouchableOpacity style={styles.invisibleclick} onPress={PressSpinner}>
          
          <View style={styles.horizontal}>
            <ActivityIndicator size={100} /> 
          </View>

          </TouchableOpacity>
        </ImageBackground>
        <StatusBar style="auto" />  
      </View>
    }
    
    {currView === "home" &&
      <View style={styles.container}>
        <ImageBackground source={dark_cityscape} resizeMode="cover" style={styles.image}>


          <View style={styles.login}>
            <Text style={styles.text}>Home</Text>
            
            <TouchableOpacity style={styles.loginButton} onPress={PressLoginScreen}
              
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              
            >
            <Text style={styles.buttonText}>
              Login
            </Text>  
            </TouchableOpacity>    

          </View>

        </ImageBackground>
        <StatusBar style="auto" />  
      </View>
    }

    {currView === "play" &&
      <View style={styles.container}>
        <ImageBackground source={sunset_cityscape} resizeMode="cover" style={styles.image}>


          <View style={styles.login}>
            <Text style={styles.text}>Home</Text>
            
            <TouchableOpacity style={styles.loginButton} onPress={PressPlay}
              
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              
            >
            <Text style={styles.buttonText}>
              Play
            </Text>  
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={PressHome}
              
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              
            >
            <Text style={styles.buttonText}>
              Exit Game
            </Text>  
            </TouchableOpacity>

          </View>

        </ImageBackground>
        <StatusBar style="auto" />  
      </View>
    }
  </>
  );
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

  checkboxContainer: {
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },

  invisibleclick:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
  }

});