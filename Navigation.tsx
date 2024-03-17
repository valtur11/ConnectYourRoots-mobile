import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/HomeScreen';
import { VideoChatDashboardScreen } from './screens/VideoChatDashboardScreen';
import { VideoChatScreen } from './screens/VideoChatScreen';

const Stack = createStackNavigator();


export function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name="VideoDashboard"
      component ={VideoChatDashboardScreen}
      />
       <Stack.Screen
      name="VideoCall"
      component ={VideoChatScreen}
      />
    </Stack.Navigator>
  );
}
