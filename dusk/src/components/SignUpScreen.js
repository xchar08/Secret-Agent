import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity} from 'react-native'; 
import cityscape from '../assets/cityscape.jpg';

export default function SignUpScreen({navigation}) {
return (
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
        
        <TouchableOpacity style={styles.loginButton} onPress={() => console.log("Create Acc Button Pressed")}
          
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
)

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight,
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