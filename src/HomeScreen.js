//src/HomeScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigation = useNavigation();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navigateToTask1 = () => {
    setIsDrawerOpen(false);
    navigation.navigate('task1description');
  };
  const navigateToTask2 = () => {
    setIsDrawerOpen(false);
    navigation.navigate('task2description');
  };

  return (
    <View style={styles.container}>

      {/* Drawer */}
      <Modal
        isVisible={isDrawerOpen}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        onBackdropPress={() => setIsDrawerOpen(false)}
        backdropOpacity={0.5}
      >
        <View style={styles.drawerContainer}>
          {/* Add your touchable items here */}
          <TouchableOpacity onPress={navigateToTask1}>
            <Text style={styles.drawerItem}>Task 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToTask2}>
            <Text style={styles.drawerItem}>Task 2</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.drawerItem}>Item 3</Text>
          </TouchableOpacity>
          {/* Add more touchable items as needed */}
        </View>
      </Modal>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Icon name="bars" size={24} color="white" style={styles.barsIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Home</Text>
      </View>

      {/* Text in the middle of the screen */}
      <Text style={styles.middleText}>Hello! You can navigate all tasks by clicking on drawer icon. Each task contain 
      its description, necessary dependencies, procedures and days of completion.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Set background color as per your preference
  },
  headerContainer: {
    backgroundColor: 'green',
    padding: 20,
    height: 70,
    width: '100%',
    bottom: 292,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 50,
    bottom: 28,
  },
  barsIcon: {
    marginRight: 10,
  },
  drawerContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    height: 840,
    position: 'absolute',
    left: -20,
  },
  drawerItem: {
    color: 'black',
    fontSize: 18,
    marginVertical: 10,
  },
  middleText: {
    fontSize: 20,
    textAlign: 'center',
   margin: 1.5,
   marginBottom:90,
   color: 'black',
  },
});

export default HomeScreen;
