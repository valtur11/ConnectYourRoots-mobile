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
  Alert,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider, Box, Button, Text, Image, ButtonText} from '@gluestack-ui/themed';

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

const FeatureCard = ({iconSvg, name, desc}: any) => {
  return (
    <Box
      flexDirection="column"
      borderWidth={1}
      borderColor="$borderDark700"
      flex={1}
      m="$2"
      p="$4"
      rounded="$md">
      <Box alignItems="center" display="flex" flexDirection="row">
        {/* <Image source={iconSvg} alt="document" width={22} height={22} /> */}
        <Text fontSize={22} color="$white" fontWeight="500" ml="$2">
          {name}
        </Text>
      </Box>
      <Text color="$textDark400" mt="$2">
        {desc}
      </Text>
    </Box>
  );
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
    <Box flex={1} bg="$black" h="100%">
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Box
          position="absolute"
          $base-h={500}
          $base-w={500}
          $lg-h={700}
          $lg-w={700}
        />
        <Box
          flex={1}
          $base-my="$16"
          $base-mx="$5"
          $base-h="80%"
          $lg-my="$24"
          $lg-mx="$32"
          alignItems="center">
          <Box
            bg="#64748B33"
            py="$2"
            px="$6"
            rounded="$full"
            alignItems="center"
            $base-flexDirection="column"
            $sm-flexDirection="row"
            $md-alignSelf="flex-start">
            <Text color="$white" fontWeight="$normal">
              Get started by editing
            </Text>
            <Text color="$white" fontWeight="$medium" ml="$2">
              App.tsx
            </Text>
          </Box>
          <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
            $base-h={20}
            $base-w={300}
            $lg-h={160}
            $lg-w={400}>
            {/* <Image src="/logo.svg" fill alt="logo" priority /> */}
          </Box>
          <Box $base-flexDirection="column" $md-flexDirection="row">
            <Button   size="lg"
  p="$3.5"
  bg="$indigo600"
  borderColor="$indigo600" onPress={ navigation.navigate('VideoDashboard', {isJoin: true})}><ButtonText>Join videocall</ButtonText></Button>
            <FeatureCard
              name="Docs"
              desc="Find in-depth information about gluestack features and API."
            />
            <FeatureCard
              name="Learn"
              desc="Learn about gluestack in an interactive course with quizzes!"
            />
            <FeatureCard
              name="Deploy"
              desc="Instantly drop your gluestack site to a shareable URL with vercel."
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
