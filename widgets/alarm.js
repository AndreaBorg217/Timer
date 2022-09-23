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
 import RNDateTimePicker from '@react-native-community/datetimepicker';


 const Alarm = () => {
  const [pickerVisible, setPickerVisible] = useState(false); 
  const [alarms, setAlarms] = useState([])
  
  return (
     <View style={styles.container}>
        {pickerVisible?(
            <RNDateTimePicker 
              mode="time" 
              display="clock" 
              value={new Date()} 
              is24Hour={true}
              positiveButtonLabel="Add alarm"  
              onChange={(event, time)=>{
                if(event.type == 'Cancel'){
                  setPickerVisible(false)
                }
                else if(event.type == 'Add alarm'){
                  if(alarms && !alarms.includes(time)){
                    setAlarms(prev => prev.push(time))
                  }
                  setPickerVisible(false)
                }
              }}
            />
        ): null}


      <TouchableOpacity style = {styles.button} onPress = {() => setPickerVisible(true)}>
        <Image style={styles.icon} source={require('../assets/plus.png')}/>
      </TouchableOpacity>        
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
    button:{
      width: 70,
      height: 70,
      borderRadius: 70/2,
      backgroundColor: '#00AAB2',
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{translateY: 235}]
    },
    icon:{
      width: 32, 
      height: 32
    },
    test:{
      backgroundColor: 'red',
      width: 300,
      height: 300,
      position: 'absolute'
    }
 });
 
 export default Alarm;
 