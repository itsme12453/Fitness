import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, ScrollView, View, navigation, Keyboard, Image, Alert, Animated, Easing } from "react-native";
import COLORS from "../../conts/colors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { registerRootComponent } from "expo";

// SplashScreen.preventAutoHideAsync();

const RegistrationScreen = ({navigation}) => {
    // const [fontsLoaded] = useFonts({
    //     // .././assets/fonts/SourceSansPro-Bold.ttf
    //     'SourceSansPro-Bold': require('../../../assets/fonts/SourceSansPro-Bold.ttf'),
    //     'SourceSansPro-SemiBold': require('../../../assets/fonts/SourceSansPro-SemiBold.ttf'),
    // });

    // const onLayoutRootView = useCallback(async () => {
    //     if (fontsLoaded) {
    //     await SplashScreen.hideAsync();
    //     }
    // }, [fontsLoaded]);

    // if (!fontsLoaded) {
    //     return null;
    // }
    const img = { uri: "https://i.imgur.com/ekAZikn.png" };
    
    const [inputs, setInputs] = useState({
        email: "",
        fullname: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        Keyboard.dismiss();
        let valid = true;

        if (!inputs.email.trim()){
            handleError("Please enter an email address", "email");
            valid = false;
        } else if(!inputs.email.trim().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            handleError("Invalid Email Address", "email");
            valid = false;
        }

        if (!inputs.fullname.trim()){
            handleError("Please enter your full name", "fullname");
            valid = false;
        }
        if (!inputs.password){
            handleError("Please enter a password", "password");
            valid = false;
        } else if(inputs.password.length < 8){
            handleError("Minimum password length of 8", "password");
            valid = false;
        } else if(/\s/g.test(inputs.password)){
            handleError("Password cannot have spaces", "password")
            valid = false;
        } else if(!inputs.password.match(/[-/`~!#*$@_%+=.,^&(){}[\]|;<>?\\]/g)){
            handleError("Password must contain atleast one special character", "password")
            valid = false;
        } else if(!inputs.password.match(/[0-9]/g)){
            handleError("Password must contain atleast one number", "password")
            valid = false;
        }

        if(valid){
            register();      
        }
    };
    
    const register = () => {
        // setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);

        //     try {
        //         // AsyncStorage.setItem("user", JSON.stringify(inputs));
        //         navigation.navigate("Login");
        //     } catch (error) {
        //         Alert.alert("Error", "Something went wrong")
        //     }

        // }, 1000);

        fetch("https://fitness-app-hxjw.onrender.com/register", {
            method: "POST",
            headers: {
                "authentication-key": "DSH$32Rfdhu@'34", "email": inputs.email, "password": inputs.password, "fullname": inputs.fullname
            }
        })
        .then(res => {
            console.log(res.status);
            // if(res.status == 200){
            //     navigation.navigate("Login");
            // }

            return res.text()

            // if(!res.status == 200){
            //     Alert.alert("Error", res.text())
            // }
        })
        .then(
            (result) => {
                // console.log("Result: " + result);
                if(result !== "Registered"){
                    Alert.alert("Error", result);
                }
            },
            (error) => {
                Alert.alert("Error", error);
            }
        )
    };

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (errorMsg, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMsg }))
    }

    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();
    })
    
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }} /*onLayout={onLayoutRootView}*/>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, }}>
                {/* <Animated.View> */}
                <Animated.Image source={img} style={{ width: "100%", aspectRatio: 1/1, transform: [{ scale: scaleAnim }] }} />
                {/* </Animated.View> */}
                <Text style={styles.title}>Sign Up</Text>
                <Text style={{
                    fontSize: 18,
                    color: COLORS.grey,
                    marginVertical: 5, //Margin top and bottom
                }}>Enter your details to sign up</Text>
                
                <View style={{ marginVertical: 10 }}>
                    <Input delay={0} error={errors.email} onFocus={() => {
                        handleError(null, "email");
                    }} onChangeText={text => handleOnChange(text, "email")} placeholder="Email ID" iconName="alternate-email" />
                    <Input delay={100} fullname error={errors.fullname} onFocus={() => {
                        handleError(null, "fullname");
                    }} onChangeText={(text) => handleOnChange(text, "fullname")} placeholder="Full Name" iconName="person-outline" />
                    <Input delay={200} error={errors.password} onFocus={() => {
                        handleError(null, "password");
                    }} onChangeText={(text) => handleOnChange(text, "password")} placeholder="Password" iconName="lock-outline" password />

                    <Button onPress={validate} title="Sign Up"></Button>
                    <Text onPress={() => navigation.navigate("Login")} style={{ color: COLORS.grey, textAlign: "center", fontSize: 16, fontWeight: "500" }}>Joined us before? <Text style={{ color: COLORS.blue }}>Login</Text></Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        // fontFamily: "SourceSansPro-SemiBold",
        fontWeight: "bold",
        color: COLORS.black,
    },
});

export default RegistrationScreen