import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = () => {
  const [seconds, setSeconds] = useState(60); // Initial seconds value for countdown

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return minutes > 0 ? `${minutes}:${String(seconds).padStart(2, '0')}` : String(seconds);
  };



  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
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
