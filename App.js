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

const App = () => {
  const [widget, setWidget] = useState('stopwatch');

  return (
    <View style={styles.container}>

    <View style = {styles.navbar}>
      <TouchableOpacity style = {[styles.navbutton, {backgroundColor: widget == 'stopwatch'? '#ff6F91': '#D15DB1'}]} onPress = {() => setWidget('stopwatch')}>
        <Image style={styles.icon} source={require('./assets/stopwatch.png')}/>
      </TouchableOpacity>

      <TouchableOpacity style = {[styles.navbutton, {backgroundColor: widget == 'timer'? '#ff6F91': '#D15DB1'}]} onPress = {() => setWidget('timer')}>
        <Image style={styles.icon} source={require('./assets/timer.png')}/>
      </TouchableOpacity>

      <TouchableOpacity style = {[styles.navbutton, {backgroundColor: widget == 'alarm'? '#ff6F91': '#D15DB1'}]} onPress = {() => setWidget('alarm')}>
        <Image style={styles.icon} source={require('./assets/alarm.png')}/>
      </TouchableOpacity>
    </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
   width: '100%',
   height: '100%',
   backgroundColor: '#9883CB',
   alignItems: 'center',
   justifyContent: 'center',
  },
  navbar:{
    flexDirection: 'row',
    position: 'absolute',
    transform: [{translateY: -300}]
  },
  navbutton:{
    width: 110,
    height: 54,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  icon:{
    width: 32, 
    height: 32
  }
});

export default App;
