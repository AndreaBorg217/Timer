/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState, useEffect} from 'react';
 import {StyleSheet, Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
 
 const formatTime = (minutes, seconds, centiseconds) =>{
  if(minutes < 10 && minutes >= 0){
    minutes = '0' + minutes;
  }
  if(seconds < 10){
    seconds = '0' + seconds;
  }
  if(centiseconds < 10){
    centiseconds = '0' + centiseconds;
  }
  return minutes + ':' + seconds + ':' + centiseconds;
 }


 const Stopwatch = () => {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [cs, setCs] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [laps, setLaps] = useState([])
  
  useEffect(() => {
    if (!seconds && !minutes && !setCs) {
      setPlaying(false); 
      setPaused(false);
      return;
    }
    else if(playing){
      const intervalId = setInterval(() => {
        setCs(prev => prev + 1);
        if(cs == 99){
          setSeconds(prev => prev + 1);
          setCs(0)
        }
        if(seconds == 59 && minutes!= 59){
          setMinutes(prev => prev + 1);
          setSeconds(0)
        }
        if(minutes == 59 && seconds == 59 && cs == 99){
          setSeconds(0);
          setMinutes(0);
          setCs(0);
          setPlaying(false); 
          setPaused(false);
          setLaps([])
        }
      }, 0.1);
      return () => clearInterval(intervalId);
    }
  }, [playing, seconds, minutes, cs]);

  const mscToCenti = (msc) => msc.split(':').map(Number).reduce((a, b, i) => a * (i < 2 ? 60 : 100) + b);
  
  const centiToMsc = (centi) => {
    const f2 = centi => centi.toString().padStart(2, 0);
    const centiseconds = centi % 100;
    centi = (centi - centiseconds) / 100;
    const seconds = centi % 60;
    let minutes = (centi - seconds) / 60;
    if(minutes < 10 && minutes >= 0){
      minutes = '0' + minutes;
    }
    return `${minutes}:${f2(seconds)}:${f2(centiseconds)}`;
  }
  
  const addLaps = () => {
    if(!laps[0]){
      let temp = [...laps]
      temp.push({lapTime: formatTime(minutes, seconds, cs), totalTime: formatTime(minutes, seconds, cs)}) 
      setLaps([...temp])   
    }
    else{
      let temp = [...laps]
      temp.push({lapTime: centiToMsc(mscToCenti(formatTime(minutes, seconds, cs)) - mscToCenti(temp[laps.length-1].totalTime)), totalTime: formatTime(minutes, seconds, cs)})
      setLaps([...temp])   
    }
  }

  const Row = ({lapTime, totalTime, index}) =>{
    return(
      <View style = {styles.tableRow}>
        <Text style = {styles.rowText}>{index}</Text>
        <View style = {styles.spacer}></View>
        <Text style = {styles.rowText}>{lapTime}</Text>
        <View style = {styles.spacer}></View>
        <Text style = {styles.rowText}>{totalTime}</Text>
      </View>
    )
  }

   return (
     <View style={styles.container}>

      <Text style = {[styles.stopwatch, {transform: [{translateY: laps[0]? -80: 50}]}]}>{formatTime(minutes, seconds, cs)}</Text>

        {laps[0]?(
          <View style = {styles.list}>
            <View style = {styles.headers}>
              <View style={styles.row}>
                <Image style={styles.headerIcon} source={require('../assets/lap.png')}/>
                <Text style={styles.header}>Lap Time</Text>
                <Text style={styles.header}>Total Time</Text>
              </View>
              <View style={styles.seperator}/>
            </View>  
            <FlatList
              data={laps}
              renderItem={({item, index}) => <Row lapTime = {item.lapTime} totalTime = {item.totalTime} index = {index+1}/>}
              keyExtractor={(item, index) => index}
            />
          </View>
          ): null
        }

        <View style = {[styles.buttonContainer, {transform: [{translateY: laps[0]? 400: 350}]}]}>
        {!playing && !paused?(
            <TouchableOpacity style = {styles.button} onPress = {() => setPlaying(true)}>
              <Image style={styles.icon} source={require('../assets/play.png')}/>
            </TouchableOpacity>        
          ):
          <View style = {styles.row}>
          {playing && !paused?(
            <View style={styles.row}>
              <TouchableOpacity style = {[styles.button, {marginRight: 170}]} onPress = {()=>{addLaps()}}>
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
              <TouchableOpacity style = {styles.button} onPress = {()=>{setPlaying(false); setPaused(false); setMinutes(0); setSeconds(0); setCs(0); setLaps([])}}>
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
    },
    row:{
      flexDirection: 'row',
    },
    header:{
      fontSize: 20,
      color: 'white',
      paddingLeft: 80,
    },
    headers:{
      transform: [{translateY: 10}],
      justifyContent: 'center',
    },
    headerIcon:{
      width: 20,
      height: 20,
      marginTop: 5
    },
    seperator:{
      borderColor: 'white',
      borderBottomWidth: 2,
      marginTop: 5
    },
    rowText:{
      color: 'white',
      fontSize: 20,
    },
    tableRow:{
      flexDirection: 'row',
      marginTop: 20
    },
    spacer:{
      paddingRight: 90
    },
    list:{
      transform: [{translateY: -40}],
      marginBottom: 20,
    }
 });
 
 export default Stopwatch;
 