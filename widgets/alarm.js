/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState, useEffect} from 'react';
 import {StyleSheet, FlatList, View, TouchableOpacity, Image, Text, Switch, Pressable} from 'react-native';
 import RNDateTimePicker from '@react-native-community/datetimepicker';
 import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [deleteVisible, setDeleteVisible] = useState(false); 
  const [toDelete, setToDelete] = useState(); 
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
        if(element.active && element.time == ' ' + hours.toString() + ':' + minutes){
          alarm.play();
        }
      });
    }, 60000);
  }, [alarms])
  
  useEffect(() => {
    const fetchAlarms = async () =>{
      const saved = await AsyncStorage.getItem('ALARMS');
      if(saved){
        setAlarms(JSON.parse(saved));
      }
      else{
        setAlarms([])
      }  
    }
    fetchAlarms();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('ALARMS', JSON.stringify(alarms));
  }, [alarms]);


  const setActive = (index) => {
    let temp = [...alarms];
    temp[index].active = !temp[index].active;
    setAlarms(prev => [...temp]);
  }

  const deleteAlarm = () => {
    let temp = [...alarms];
    temp.splice(toDelete,1);
    setAlarms(prev => [...temp]);
    setToDelete(null)
  }


  const Row = ({time, index}) =>{
    return(
      <Pressable style = {styles.row} onLongPress={()=> {setToDelete(index); setDeleteVisible(true)}}>
        <Text style = {styles.time}>{time}</Text>
        <Switch
          trackColor={{ false: "white", true: "#38AE90" }}
          thumbColor={alarms[index].active ? "white" : '#38AE90'}
          onValueChange={()=>setActive(index)}
          value={alarms[index].active}
        />
      </Pressable>
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
                  let currentAlarms = []
                  alarms.forEach(alarm => {currentAlarms.push(alarm.time)})
                  if(!currentAlarms.includes(alarm)){
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

      {deleteVisible?(
        <View style = {styles.deleteModal}>
          <TouchableOpacity style={styles.deleteButton} onPress={()=>{deleteAlarm(); setDeleteVisible(false)}}>
            <Image style={styles.deleteIcon} source={require('../assets/delete.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={()=>setDeleteVisible(false)}>
            <Image style={styles.deleteIcon} source={require('../assets/close.png')}/>
          </TouchableOpacity>
        </View>
        ): null}
      
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
      marginBottom: 20,
      transform: [{translateX: -10}],
    },
    time:{
      color: 'white',
      fontSize: 30,
      paddingRight: 175,
    },
    deleteModal:{
      width: 388,
      height: 200,
      backgroundColor: '#116C6E',
      position: 'absolute',
      transform: [{translateY: 260}],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50
    },
    deleteIcon:{
      width: 32,
      height: 32,
    },
    deleteButton:{
      margin: 60,
      alignItems: 'center',
      justifyContent: 'center',
      width: 70,
      height: 70,
      borderRadius: 70/2,
      backgroundColor: '#00AAB2',
    }
 });
 
 export default Alarm;
 