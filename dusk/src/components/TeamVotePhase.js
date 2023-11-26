import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import Timer from './Timer';
import { GameContext } from '../services/gameState';


export default function TeamVotePhase({ round, isHost, players, circleStatus, onSubmitTeam, code }) {
    const { game, setGame } = useContext(GameContext);
    console.log("game:", game);
    const [playersSelected, setPlayersSelected] = useState([]);

    function handlePlayerPress(player) {
        setPlayersSelected([...playersSelected, player]);
    }

    console.log("circleStatus: ", circleStatus);
    console.log("players", players);


    console.log("isHost", isHost);
    console.log("code", code);
    console.log("round", round);

    return (

        <View >
           




                {players && <View style={styles.hexagonContainer}>
                    {players.map((player) => (
                        <TouchableOpacity
                            key={player.id}
                            style={styles.hexagonSlice}
                            onPress={() => handlePlayerPress(player)}
                        >
                            <Text style={styles.playerName}>{player.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>}
                <View>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => onSubmitTeam(playersSelected)}
                    >
                        <Text style={styles.blackText}>Submit Team Proposal</Text>
                    </TouchableOpacity>
                </View>




                <StatusBar style="auto" />
          
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    headerBox: {
        flex: 1,
        alignItems: 'center',
    },
    mainBox: {
        flex: 3,
        flexDirection: 'vertical',
        backgroundColor: 'white', //Intentionally overwrites the parent container's background color
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBox: {
        flex: 1,
        flexDirection: 'row',
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
    bar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
        padding: 10,
    },
    roundText: {
        fontStyle: 'italic',
        fontSize: 30,
        color: 'white',
    },
    headerText: {
        fontStyle: 'italic',
        fontSize: 15,
        color: 'white',
    },
    buttonText: {
        color: 'darkblue',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    timer: {
        //alignSelf: 'top', doesnt work
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 10,
    },
    hexagonContainer: {
        flexDirection: 'vertical',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hexagonSlice: {
        width: 200,
        height: 58,
        backgroundColor: '#3248a8',
        margin: 2,
        borderRadius: 100,
        overflow: 'hidden',
        position: 'relative',
    },
    playerName: {
        textAlign: 'center',
        color: 'white',
        margin: 10,
    },
    submitButton: {
        width: 300,
        height: 40,
        backgroundColor: 'white',
        margin: 1,
        borderRadius: 100,
        borderColor: '#3248a8',
        borderWidth: 2,
    },
    blackText: {
        textAlign: 'center',
        color: '#3248a8',
        fontSize: 20,
        margin: 5,
    }

})