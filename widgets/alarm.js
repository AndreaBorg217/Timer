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
 
 const Alarm = () => {
   const [widget, setWidget] = useState('stopwatch');
 
   return (
     <View style={styles.container}>
        <Text style = {styles.text}>ALARM</Text>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 300,
    },
    text:{
        color: 'white',
        fontSize: 50
    }
 });
 
 export default Alarm;
 