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
 import ScrollPicker from 'react-native-wheel-scrollview-picker';


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
 const [minutes, setMinutes] = useState(0)
 const [seconds, setSeconds] = useState(0)

 useEffect(() => {
  if (!seconds && !minutes) {
    setPlaying(false); 
    setPaused(false);
  }
  else if(playing){
    const intervalId = setInterval(() => {
      setSeconds(prev => prev - 1);
      if(seconds == 0 && minutes != 0){
        setMinutes(prev => prev - 1);
        setSeconds(59)
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }
}, [playing, seconds, minutes]);



   return (
     <View style={styles.container}>
     {!playing && !paused?(
      <View style={styles.row}>
        <ScrollPicker
          dataSource={Array.from(Array(60).keys())}
          selectedIndex={1}
          wrapperColor='#116C6E'
          renderItem={(data) => {
            return( <View style={styles.pickerItem}><Text style={styles.pickerText}>{data}</Text></View> )
          }}
          onValueChange={(data) => {
            setMinutes(data)
          }}
          wrapperHeight={180}
          wrapperWidth={150}
          itemHeight={80}
          highlightColor = 'white'
          highlightBorderWidth={4}
        />
      <Text style = {styles.colon}>:</Text>
      <ScrollPicker
          dataSource={Array.from(Array(60).keys())}
          selectedIndex={1}
          wrapperColor='#116C6E'
          renderItem={(data) => {
            return(<View style={styles.pickerItem}><Text style={styles.pickerText}>{data}</Text></View>)
          }}
          onValueChange={(data) => {
            setSeconds(data)
          }}
          wrapperHeight={180}
          wrapperWidth={150}
          itemHeight={80}
          highlightColor = 'white'
          highlightBorderWidth={4}
        />
      </View>
      ): <Text style = {styles.timer}>{formatTime(minutes, seconds)}</Text>
     }
     <View style = {styles.buttonContainer}>
          {!playing && !paused?(
            <TouchableOpacity style = {styles.button} onPress = {() => setPlaying(true)}>
              <Image style={styles.icon} source={require('../assets/play.png')}/>
            </TouchableOpacity>        
          ): 
          <View style = {styles.row}>
          {!playing && paused?(
            <TouchableOpacity style = {[styles.button, {marginRight: 150}]} onPress = {() => {setPlaying(true); setPaused(false)}}>
              <Image style={styles.icon} source={require('../assets/play.png')}/>
            </TouchableOpacity>        
          ): <TouchableOpacity style = {[styles.button, {marginRight: 150}]} onPress = {() => {setPlaying(false); setPaused(true)}}>
              <Image style={styles.icon} source={require('../assets/pause.png')}/>
            </TouchableOpacity>
          }
            <TouchableOpacity  style = {[styles.button, {transform: [{translateX: 10}]}]} onPress = {() => {setPlaying(false); setPaused(false); setMinutes(0); setSeconds(0)}}>
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
    row:{
      flexDirection: 'row',
    },
    pickerItem:{
      backgroundColor: '#116C6E',
    },
    pickerText:{
      fontSize: 50,
      color: 'white',
    },
    colon:{
      padding: 40,
      color: 'white',
      fontSize: 70
    },
    label:{
      color: 'white',
      fontSize: 20,
    }
 });
 
 export default Timer;
 