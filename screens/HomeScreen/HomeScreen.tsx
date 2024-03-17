/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider, Box, Button, Text, Image, ButtonText, VStack, HStack, Heading} from '@gluestack-ui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  checkMultiple,
  requestMultiple,
  openSettings,
  PERMISSIONS,
  RESULTS,
  Permission,
  PermissionStatus,
} from 'react-native-permissions';

import {EventType, useZoom} from '@zoom/react-native-videosdk';

// TODO: Enable photo library permission when sharing view is done.
const platformPermissions = {
  ios: [
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.MICROPHONE,
    //PERMISSIONS.IOS.PHOTO_LIBRARY,
  ],
  android: [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    PERMISSIONS.ANDROID.READ_PHONE_STATE,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  ],
};


type DashboardScreenProps = {
  route: any;
    navigation: any;
  };
  const HomeScreen = ({route, navigation}: DashboardScreenProps ) => {
    const zoom = useZoom();

    useEffect(() => {
      if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
        return;
      }

      const permissions = platformPermissions[Platform.OS];
      let blockedAny = false;
      let notGranted: Permission[] = [];

      checkMultiple(permissions).then(
        (statuses: Record<Permission[number], PermissionStatus>) => {
          permissions.map((p: Permission) => {
            const status = statuses[p];
            if (status === RESULTS.BLOCKED) {
              blockedAny = true;
            } else if (status !== RESULTS.GRANTED) {
              notGranted.push(p);
            }
          });
          notGranted.length && requestMultiple(notGranted);
          blockedAny && openSettings();
        },
      );

      const inputProxyAccount = zoom.addListener(
        EventType.onProxySettingNotification,
        () => {
          Alert.alert(
            'You are using a proxy, please open your browser to login.',
          );
        },
      );

      const sslCertVerifiedFailNotification = zoom.addListener(
        EventType.onSSLCertVerifiedFailNotification,
        () => {
          Alert.alert('SSL Certificate Verify Fail Notification.');
        },
      );

      return () => {
        inputProxyAccount.remove();
        sslCertVerifiedFailNotification.remove();
      };
    }, []);

    return (
      <Box flex={1} bg="$white" h="100%">
        <ScrollView contentInsetAdjustmentBehavior="automatic">        
            {/* <Button   
            size="lg"
             bg="#016FB9" borderColor="#016FB9" 
              onPress={() => navigation.navigate('VideoDashboard', {isJoin: false})}><ButtonText color="white">Обади се на видеочат</ButtonText></Button>
              <Button
        size="lg"
             bg="#016FB9" borderColor="#016FB9" 
                onPress={() => navigation.navigate('VideoDashboard', {isJoin: true})}>
              <ButtonText color="white"> Join videocall</ButtonText></Button>
              <Button           size="lg"
              onPress={() => navigation.navigate('VideoDashboard', {isJoin: false})}><ButtonText>Обади се на видеочат</ButtonText></Button>

<Button   
              onPress={() => navigation.navigate('VideoDashboard', {isJoin: false})}><ButtonText>Обади се на видеочат</ButtonText></Button> */}
      <Heading  marginTop={30}  size="xl" textAlign='center'>Connect Your Roots</Heading>
      <Text size="xl" textAlign='center'>Свържете се с близките</Text>
      <HStack marginTop={30} justifyContent="center" space="sm" reversed={false} >
      
      <TouchableOpacity onPress={() => navigation.navigate('VideoDashboard', {isJoin: true})}>
        <Box borderRadius="$md" bg="#016FB9" justifyContent='center' alignItems="center" height={200} width={200}><Text color="white" fontSize={20}>Видео разгoвори </Text><Icon name="video-camera" size={80} color="white" /></Box>
      </TouchableOpacity>
      <Box borderRadius="$md" bg="#016FB9" justifyContent='center' alignItems="center" height={200} width={200}><Text color="white" fontSize={20}>Телефонни разговори </Text><Icon name="phone" size={80} color="white" /></Box>
      </HStack>

      <HStack marginTop={30} justifyContent="center" space="sm" reversed={false} >
      
      <Box borderRadius="$md" bg="#016FB9" justifyContent='center' alignItems="center" height={200} width={200}><Text color="white" fontSize={20}>Текстови съобщения </Text><Icon name="commenting-o" size={80} color="white" /></Box>
      <TouchableOpacity onPress={() => setTimeout(() => navigation.navigate('VideoCallDialing'), 5000)} ><Box borderRadius="$md" bg="#016FB9" justifyContent='center' alignItems="center" height={200} width={200}><Text color="white" fontSize={20}>Настройки </Text><Icon name="gears" size={80} color="white" /></Box>
      </TouchableOpacity></HStack>
      
        </ScrollView>
      </Box>
    );
  };

  export default HomeScreen;
