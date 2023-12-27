// App.js
import React from 'react';

import HomeScreen from './src/HomeScreen';
import Task1Description from './src/Task1Description';
import Task2Description from './src/Task2Description';
import task1 from './src/task1'; 
import task2 from './src/task2'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
  <Stack.Screen name="Home" component={HomeScreen}options={{ headerShown: false }} />
  <Stack.Screen name="task1" component={task1} />
  <Stack.Screen name="task2" component={task2} />
  <Stack.Screen name="task1description" component ={Task1Description}></Stack.Screen>
  <Stack.Screen name="task2description" component ={Task2Description}></Stack.Screen>
</Stack.Navigator>
       
     
    </NavigationContainer>
  );
};

export default App;
