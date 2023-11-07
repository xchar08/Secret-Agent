import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity} from 'react-native'; 
import cityscape from '../assets/cityscape.jpg';

export default function boilerplate({navigation}) {
return (
    <ImageBackground source={cityscape} resizeMode="cover" style={styles.image}>
        <Text>Boiler Plate</Text>
    </ImageBackground>
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


})