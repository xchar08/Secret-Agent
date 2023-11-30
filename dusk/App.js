import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/components/LoginPage'
import React, { useState, useEffect } from 'react';

import SplashScreen from './src/components/SplashScreen'
import SignUpScreen from './src/components/SignUpScreen'
import GameLobby from './src/components/GameLobby';
import CreateGame from './src/components/CreateGameScreen';
import JoinGame from './src/components/JoinGameScreen';
import GameScreen from './src/components/GameScreen';

import { firebase as authProvider } from '@react-native-firebase/auth';
import { AuthContext, CodeContext, HostContext, MissionContext } from './src/services/gameState';

const AuthStack = createNativeStackNavigator();
const GameStack = createNativeStackNavigator();

//There are TWO seperate stack navigators. Only a verified, logged in user can access the GameNavigator 
const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="SplashScreen">
    <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
    <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <AuthStack.Screen name="LoginPage" component={LoginPage} />
  </AuthStack.Navigator>
);

const GameNavigator = () => {
  const [code, setCode] = useState(null);
  const [host, setHost] = useState(null);
  const [mission, setMission] = useState(null);

  return (
    <HostContext.Provider value={{ host, setHost }}>
      <CodeContext.Provider value={{ code, setCode }}>
        <MissionContext.Provider value={{ mission, setMission }}>
          <GameStack.Navigator initialRouteName="GameLobby">
            <GameStack.Screen name="GameLobby" component={GameLobby} />
            <GameStack.Screen name="CreateGame" component={CreateGame} />
            <GameStack.Screen name="JoinGame" component={JoinGame} />
            <GameStack.Screen name="GameScreen" component={GameScreen} />
          </GameStack.Navigator>
        </MissionContext.Provider>
      </CodeContext.Provider>
    </HostContext.Provider>
  )
};

export default function App() {


  //initialize the game state when the app loads,
  // and other screens will pull this context to update 
  //the various fields on the gamestate over time.
  //const [game, setGame] = useState(gameState);
  const [user, setUser] = useState(null);

  useEffect(() => {


    const FIREBASE_AUTH = authProvider.auth();

    FIREBASE_AUTH.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);

    })




  }, []);


  //Decide which stack navigator to call based on whether or not user is logged in
  return (
    <AuthContext.Provider value={{ user, setUser }}>

      <NavigationContainer>
        {user ? <GameNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


