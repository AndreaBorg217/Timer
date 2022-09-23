/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState} from 'react';
 import {StyleSheet, FlatList, View, TouchableOpacity, Image, Text, Switch} from 'react-native';
 import RNDateTimePicker from '@react-native-community/datetimepicker';


 const Alarm = () => {
  const [pickerVisible, setPickerVisible] = useState(false); 
  const [alarms, setAlarms] = useState([{time: '10:00', active:false}, {time: '15:00', active:false}])
  
  const setActive = (index) => {
    let temp = [...alarms];
    temp[index].active = !temp[index].active;
    setAlarms(prev => [...temp]);
  }


  const Row = ({time, index}) =>{
    return(
      <View style = {styles.row}>
        <Text style = {styles.time}>{time}</Text>
        <Switch
          trackColor={{ false: "white", true: "#38AE90" }}
          thumbColor={alarms[index].active ? "white" : '#38AE90'}
          onValueChange={()=>setActive(index)}
          value={alarms[index].active}
        />
      </View>
    )
  }

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

        <FlatList
          style = {styles.list}
          data={alarms}
          renderItem={({item, index}) => <Row time = {item.time} index = {index}/>}
          keyExtractor={(item, index) => index}
        />

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
      position: 'absolute',
      transform: [{translateY: 235}]
    },
    icon:{
      width: 32, 
      height: 32
    },
    list:{
      transform: [{translateY: -50}],
    },
    row:{
      flexDirection: 'row',
      margin: 10,
      transform: [{translateX: -10}],
    },
    time:{
      color: 'white',
      fontSize: 30,
      paddingRight: 175,

    }
 });
 
 export default Alarm;
 