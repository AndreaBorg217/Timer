/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState, useEffect} from 'react';
 import {StyleSheet, FlatList, View, TouchableOpacity, Image, Text, Switch} from 'react-native';
 import RNDateTimePicker from '@react-native-community/datetimepicker';
 import Sound from 'react-native-sound';  

 Sound.setCategory('Playback');

 var alarm = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('Failed to load alarm', error);
    return;
  }
 });

 const Alarm = () => {
  const [pickerVisible, setPickerVisible] = useState(false); 
  const [alarms, setAlarms] = useState([]);
  

  useEffect(() => {
    setInterval(() => {
      let timestamp = new Date();
      let hours = timestamp.getHours();
      let minutes = timestamp.getMinutes();
      if(minutes < 10) {
        minutes = '0' + minutes
      };

      alarms.forEach(element => {
        if(element.active && element.time == hours.toString() + ':' + minutes){
          alarm.play();
        }
      });
    }, 60000);
  }, [alarms])
  
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
                console.log();
                if(event.type === 'set'){
                  let alarm = time.toString().slice(15,21)
                  if(!alarms.includes(alarm)){
                    setAlarms([...alarms,{time: alarm, active: false}])
                    setPickerVisible(false)
                  }
                }
                setPickerVisible(false)
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
 