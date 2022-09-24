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
 
 const formatTime = (minutes, seconds, milliseconds) =>{
  if(minutes < 10 && minutes >= 0){
    minutes = '0' + minutes;
  }
  if(seconds < 10){
    seconds = '0' + seconds;
  }
  if(milliseconds < 10){
    milliseconds = '0' + milliseconds;
  }
  return minutes + ':' + seconds + ':' + milliseconds;
 }


 const Stopwatch = () => {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [ms, setMs] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!seconds && !minutes && !setMs) {
      setPlaying(false); 
      setPaused(false);
      return;
    }
    else if(playing){
      const intervalId = setInterval(() => {
        setMs(prev => prev + 1);
        if(ms == 99){
          setSeconds(prev => prev + 1);
          setMs(0)
        }
        if(seconds == 59 && minutes!= 59){
          setMinutes(prev => prev + 1);
          setSeconds(0)
        }
        if(minutes == 59 && seconds == 59 && ms == 99){
          setSeconds(0);
          setMinutes(0);
          setMs(0);
          setPlaying(false); 
      setPaused(false);
        }
      }, 1);
      return () => clearInterval(intervalId);
    }
  }, [playing, seconds, minutes, ms]);

   return (
     <View style={styles.container}>
        <Text style = {styles.stopwatch}>{formatTime(minutes, seconds, ms)}</Text>

        <View style = {styles.buttonContainer}>
        {!playing && !paused?(
            <TouchableOpacity style = {styles.button} onPress = {() => setPlaying(true)}>
              <Image style={styles.icon} source={require('../assets/play.png')}/>
            </TouchableOpacity>        
          ):
          <View style = {styles.row}>
          {playing && !paused?(
            <View style={styles.row}>
              <TouchableOpacity style = {[styles.button, {marginRight: 170}]} onPress = {()=>{}}>
                <Image style={styles.icon} source={require('../assets/lap.png')}/>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.button} onPress = {() => {setPlaying(false); setPaused(true)}}>
                <Image style={styles.icon} source={require('../assets/pause.png')}/>
              </TouchableOpacity>   
            </View>      
          ): 
            <View style = {styles.row}>
            {!playing && paused?(
            <View style={styles.row}>
              <TouchableOpacity style = {[styles.button, {marginRight: 170}]} onPress = {() => {setPlaying(true); setPaused(false)}}>
                <Image style={styles.icon} source={require('../assets/play.png')}/>
              </TouchableOpacity>   
              <TouchableOpacity style = {styles.button} onPress = {()=>{setPlaying(false); setPaused(false); setMinutes(0); setSeconds(0); setMs(0)}}>
                <Image style={styles.icon} source={require('../assets/stop.png')}/>
              </TouchableOpacity>
            </View>  
            ):null}
            </View>
          }
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
    stopwatch:{
      color: 'white',
      fontSize: 65,
      position: 'absolute',
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
    row:{
      flexDirection: 'row',
    },
 });
 
 export default Stopwatch;
 