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
 
 const Timer = () => {
 const [timer, setTimer] = useState('00:00:00')
 const [playing, setPlaying] = useState(false)
   return (
     <View style={styles.container}>
        <Text style = {styles.text}>{timer}</Text>

     <View style = {styles.buttonContainer}>
          {!playing?(
            <TouchableOpacity style = {styles.button} onPress = {() => {setPlaying(true)}}>
              <Image style={styles.icon} source={require('../assets/play.png')}/>
            </TouchableOpacity>
          ): 
          <View style = {styles.twoButtons}>
            <TouchableOpacity style = {[styles.button, {marginRight: 150}]} onPress = {() => {setPlaying(false)}}>
              <Image style={styles.icon} source={require('../assets/stop.png')}/>
            </TouchableOpacity>

            <TouchableOpacity  style = {[styles.button, {transform: [{translateX: 10}]}]} onPress = {() => {setPlaying(false)}}>
              <Image style={styles.icon} source={require('../assets/pause.png')}/>
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
    text:{
        color: 'white',
        fontSize: 70
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
 