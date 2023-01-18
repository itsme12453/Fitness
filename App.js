import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/views/screens/LoginScreen';
import RegistrationScreen from './src/views/screens/RegistrationScreen';
import HomeScreen from './src/views/screens/HomeScreen';

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'; 

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'SourceSansPro-Bold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
    'SourceSansPro-SemiBold': require('./assets/fonts/SourceSansPro-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <View style={styles.container} onLayout={onLayoutRootView}>
    //   <Text style={styles.title}>Login</Text>
    // </View>

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 25,
    marginTop: 200,
  },
  title: {
    fontSize: RFPercentage(5),
    fontFamily: "SourceSansPro-SemiBold",
    color: "#182747",
    marginBottom: 20,
  },
});
