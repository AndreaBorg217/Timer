/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState, useEffect} from 'react';
 import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';


 const formatTime = (minutes, seconds) =>{
  if(minutes < 10 && minutes >= 0){
    minutes = '0' + minutes;
  }
  if(seconds < 10){
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds
 }

 const Timer = () => {

 const [playing, setPlaying] = useState(false)
 const [paused, setPaused] = useState(false)
 const [minutes, setMinutes] = useState(1)
 const [seconds, setSeconds] = useState(10)

   return (
     <View style={styles.container}>
        <Text style = {styles.timer}>{formatTime(minutes, seconds)}</Text>

     <View style = {styles.buttonContainer}>
          {!playing && !paused?(
            <TouchableOpacity style = {styles.button} onPress = {() => setPlaying(true)}>
              <Image style={styles.icon} source={require('../assets/play.png')}/>
            </TouchableOpacity>        
          ): 
          <View style = {styles.twoButtons}>
          {!playing && paused?(
            <TouchableOpacity style = {[styles.button, {marginRight: 150}]} onPress = {() => {setPlaying(true); setPaused(false)}}>
              <Image style={styles.icon} source={require('../assets/play.png')}/>
            </TouchableOpacity>        
          ): <TouchableOpacity style = {[styles.button, {marginRight: 150}]} onPress = {() => {setPlaying(false); setPaused(true)}}>
              <Image style={styles.icon} source={require('../assets/pause.png')}/>
            </TouchableOpacity>
          }
            <TouchableOpacity  style = {[styles.button, {transform: [{translateX: 10}]}]} onPress = {() => {setPlaying(false); setMinutes(0); setSeconds(0)}}>
              <Image style={styles.icon} source={require('../assets/stop.png')}/>
            </TouchableOpacity>
          </View>
        }
      </View>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
    container: {
      width: 300,
      height: 300,
      alignItems: 'center',
    },
    timer:{
      color: 'white',
      fontSize: 70,
      transform: [{translateY: 60}]
    },
    button:{
      width: 70,
      height: 70,
      borderRadius: 70/2,
      backgroundColor: '#00AAB2',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon:{
      width: 32, 
      height: 32
    },
    buttonContainer:{
      position: 'absolute',
      transform: [{translateY: 350}]
    },
    twoButtons:{
      flexDirection: 'row',
    }
 });
 
 export default Timer;
 