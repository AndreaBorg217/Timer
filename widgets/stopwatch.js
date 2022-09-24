/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState} from 'react';
 import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
 
 const formatTime = (minutes, seconds, milliseconds) =>{
  if(minutes < 10 && minutes >= 0){
    minutes = '0' + minutes;
  }
  if(seconds < 10){
    seconds = '0' + seconds;
  }
  if(milliseconds < 10){
    milliseconds = '00' + milliseconds;
  }
  if(milliseconds < 100 && milliseconds > 10){
    milliseconds = '0' + milliseconds;
  }
  return minutes + ':' + seconds + ':' + milliseconds;
 }


 const Stopwatch = () => {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [ms, setMs] = useState(0)
   return (
     <View style={styles.container}>
        <Text style = {styles.stopwatch}>{formatTime(minutes, seconds, ms)}</Text>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
    container: {
      width: 300,
      height: 300,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      color: 'white',
      fontSize: 50
    },
    stopwatch:{
      color: 'white',
      fontSize: 65,
    },
 });
 
 export default Stopwatch;
 