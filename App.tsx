import 'react-native-gesture-handler';

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider, Box, Text, Image} from '@gluestack-ui/themed';

import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './Navigation';
import {ZoomVideoSdkProvider} from '@zoom/react-native-videosdk';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // height: '100%',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <GluestackUIProvider config={config}>
        <Box
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
          height="100%">
          <NavigationContainer>
            <ZoomVideoSdkProvider
              config={{
                domain: 'zoom.us',
                enableLog: true,
              }}>
              <Navigation />
            </ZoomVideoSdkProvider>
          </NavigationContainer>
        </Box>
      </GluestackUIProvider>
    </SafeAreaView>
  );
}

export default App;
