import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = ({limit, onLimit}) => {
  console.log("Limit: ", limit);
  //const [prevSeconds, setPrevSeconds] = useState(limit); // Initial seconds value for countdown
  let prevSeconds = limit;

  useEffect(() => {
  //  console.log("Mounted: ", prevSeconds);
  const intervalId = setInterval(() => {

    // if (prevSeconds === 0) return;
     prevSeconds = prevSeconds - 1;
     
     if (prevSeconds === 0)
     {
      
       clearInterval(intervalId);
       onLimit();
     }
   }, 1000);
 }, []); // The empty dependency array ensures that the effect runs once when the component mounts


  

   // Clean up the interval when the component is unmounted
   //return () =>

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const secondsText = timeInSeconds % 60;

    return minutes > 0 ? `${minutes}:${String(secondsText).padStart(2, '0')}` : String(secondsText);
  };



  return (
    <View style={styles.container}>
      { (prevSeconds > 0) && <Text style={styles.timerText}>{formatTime(prevSeconds)}</Text> }
      { (prevSeconds === 0) && <Text style={styles.timerText}>Times up!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Timer;
