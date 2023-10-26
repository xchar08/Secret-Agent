//import { spawnSync } from 'child_process';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Button, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import cityscape from './assets/cityscape.jpg';

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const onPressLogIn = () => {
    console.log('Learn More pressed');
    setLoggedIn(true);
  }
  const onPressLogOut = () => {
    console.log('Learn More pressed');
    setLoggedIn(false);
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={cityscape} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Let's Go!</Text>
          {isLoggedIn !== true && 
            <Button onPress={onPressLogIn}
              title="Log In"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          }
          {isLoggedIn !== false && 
            <Button onPress={onPressLogOut}
              title="Log Out"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          }
      </ImageBackground>
      <StatusBar style="auto" />  
    </View>
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
    backgroundColor: '#000000c0',
  },
});