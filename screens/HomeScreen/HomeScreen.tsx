/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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

const HomeScreen = () => {
  return (
    <Box flex={1} bg="$black" h="100%">
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Box
          position="absolute"
          $base-h={500}
          $base-w={500}
          $lg-h={700}
          $lg-w={700}>
        
        </Box>
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
