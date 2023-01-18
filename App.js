import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.title}>Login</Text>
    </View>
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
    color: "#1D304E",
    marginBottom: 20,
  },
  // input: {
  //   borderColor: "#fff",
  //   borderBottomColor: "#e3e3e3",
  //   backgroundColor: "none",
  //   height: 100,
  // }
});
