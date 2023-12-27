// Task1Description.js

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Task1Description = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        This is the description of this task. Here i worked on local notification in react native useNavigation
        notifee library. I also have scheduled meeting here using this library.
        Cancellation of scheduled meeting notification is also done in this task.
        Daily or wekly notification also working in this task. I took 3 days for the completion of this task.
      </Text>
      <Button title='Go to task1' onPress={()=> {navigation.navigate('task1')}}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color:'black',
    bottom:90,
  },
});

export default Task1Description;
