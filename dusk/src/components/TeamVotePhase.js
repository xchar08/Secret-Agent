import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import Timer from './Timer';
import { GameContext } from '../services/gameState';


export default function TeamVotePhase({ mission, isHost, players, onSubmitTeam, teamSubmitted, proposedTeam, onSubmitVote /**Team submitted parameter here */ /**create a on submit vote handler similar to onSubmitTeam */ /**proposedTeam parameter here */ }) {
    const { game, setGame } = useContext(GameContext);
    console.log("team vote mission", mission);


    //const selectedPlayers = players.map((player) => ({ ...player, selected: false }));
    const [selectedPlayers, setSelectedPlayers] = useState((players) ? players.map((player) => ({ ...player, selected: false })) : []);
    function handlePlayerPress(player) {

        if ((player.selected) || (!player.selected && selectedPlayers.filter(p => p.selected).length < 3)) {
            player.selected = !player.selected;

            setSelectedPlayers([...selectedPlayers.filter(p => p.id != player.id), player]);
        }
    }

    console.log("players", players);
    console.log("isHost", isHost);

    return (

        <View >
            {!isHost && <View>
                <Text>Vote on this Round's Team Proposal</Text>
                {teamSubmitted && proposedTeam.map((player) => (

                    <Text key={player.id}
                        style={(player.selected) ? styles.selectedPlayerName : styles.playerName}>{player.name}</Text>

                ))
                /** create a template here for  displaying the players if and only if the team submitted is true*/}

                {/** create the vote buttons here yay or nay etc. */}

            </View>}
            {players && isHost && <View style={styles.hexagonContainer}>
                {selectedPlayers.map((player) => (
                    <TouchableOpacity
                        key={player.id}
                        style={(player.selected) ? styles.selectedHexagonSlice : styles.hexagonSlice}
                        onPress={() => handlePlayerPress(player)}
                    >
                        <Text style={(player.selected) ? styles.selectedPlayerName : styles.playerName}>{player.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>}
            <View>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => onSubmitTeam(selectedPlayers.filter(p => p.selected))}
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
    selectedPlayerName: {
        textAlign: 'center',
        color: 'green',
        margin: 10,
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
    selectedHexagonSlice: {
        width: 200,
        height: 58,
        backgroundColor: '#000',
        margin: 2,
        borderRadius: 100,
        overflow: 'hidden',
        position: 'relative',
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