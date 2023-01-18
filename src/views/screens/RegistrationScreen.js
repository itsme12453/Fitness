import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";
import COLORS from "../../conts/colors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const RegistrationScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20, }}>
                <Text style={styles.title}>Sign Up</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 40,
      fontFamily: "SourceSansPro-SemiBold",
      color: COLORS.black,
      marginBottom: 20,
    },
});

export default RegistrationScreen