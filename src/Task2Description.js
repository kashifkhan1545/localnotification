// Task2Description.js

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Task2Description = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Task2 Description
      </Text>
      <Button title='Go to task2' onPress={()=> {navigation.navigate('task2')}}></Button>
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

export default Task2Description;
