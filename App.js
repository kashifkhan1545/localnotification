// App.js
import React from 'react';
import Home from './src/Home'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Notification" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
