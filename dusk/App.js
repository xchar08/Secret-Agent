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
  const onPressLogIn = () => {
    console.log('Learn More pressed');
    setLoggedIn(true);
    setCurrView("spinner");
  }
  const onPressLogOut = () => {
    console.log('Learn More pressed');
    setLoggedIn(false);
  }
  const onPressSpinner = () => {
    console.log('Learn More pressed');
    setCurrView("home");
  }
  const onPressHomeToLogin = () => {
    console.log('Learn More pressed');
    setCurrView("login");
  }
  const onPressLoginToSignup = () => {
    console.log('Learn More pressed');
    setCurrView("signup");
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


            
            <TouchableOpacity style={styles.loginButton} onPress={onPressLogIn}
              
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              
            >
            <Text style={styles.buttonText}>
              Login
            </Text>  
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={onPressLoginToSignup}
              
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              
            >
            <Text style={styles.buttonText}>
              SignUp
            </Text>  
            </TouchableOpacity>
              

          </View>

        </ImageBackground>
        <StatusBar style="auto" />  
      </View>
    }
    {currView === "signup" &&
      <View style={styles.container}>
        <ImageBackground source={cityscape} resizeMode="cover" style={styles.image}>


          <View style={styles.login}>
            <Text style={styles.text}>SignUp</Text>

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
            
            <TouchableOpacity style={styles.loginButton} onPress={onPressLogIn}
              
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              
            >
            <Text style={styles.buttonText}>
              SignUp
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

          <TouchableOpacity style={styles.invisibleclick} onPress={onPressSpinner}>
          
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
            
            <TouchableOpacity style={styles.loginButton} onPress={onPressHomeToLogin}
              
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
    borderRadius: 35,
    color: 'white',
    padding: 10,
    paddingLeft: 15,
    backgroundColor: 'transparent',
  },

  login: {
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: '#000000c0',
    backgroundOpacity: 0.5,
    backdropFilter: 'blur(80px)',
    padding: 20,
    margin: 10,
  },
  
  loginButton: {
    margin: 20,
    padding: 20,  
    borderWidth: 2,
    borderRadius: 35,
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