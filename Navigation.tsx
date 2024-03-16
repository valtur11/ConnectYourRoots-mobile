import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/HomeScreen';

const Stack = createStackNavigator();


export function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
