import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Animated, Easing } from "react-native";
import COLORS from "../../conts/colors";
import { MaterialIcons, Ionicons } from "@expo/vector-icons"

const Input = ({
    iconName, 
    error, 
    password,
    fullname,
    onFocus=() => {},
    delay = 0,
    ...props 
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);

    const translation = useRef(new Animated.Value(-400)).current;

    useEffect(() => {
        Animated.timing(translation, {
            toValue: 0,
            duration: 500,
            easing: Easing.out(Easing.exp),
            delay: delay,
            useNativeDriver: true,
        }).start();
    })

    return (
        <View style={{ marginBottom: 20 }}>
            <Animated.View style={[styles.inputContainer, {borderBottomColor: error ? COLORS.red : isFocused ? COLORS.lightblue: COLORS.lightgrey, transform: [{ translateX: translation }] }]}>
                <MaterialIcons name={iconName} size={34} style={{ color: COLORS.midgrey, paddingRight: 10, }} />
                <TextInput secureTextEntry={hidePassword} placeholderTextColor={COLORS.midgrey} autoCorrect={false} onFocus={() => {
                    onFocus();
                    setIsFocused(true);
                }}
                onBlur={() => {
                    setIsFocused(false);
                }}
                style={{ fontSize: 18, color: COLORS.black, flex: 1, fontWeight: "500", opacity: 0.8 }} autoCapitalize={ fullname ? "words" : "none" } {...props} />

                { password && (
                    <Ionicons onPress={() => {setHidePassword(!hidePassword)}} name={hidePassword ? "eye-outline" : "eye-off-outline" } size={30} style={{ color: COLORS.grey }} />
                ) }
            </Animated.View>

            {error && (
                <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 5 }}>{error}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 55,
        flexDirection: "row",
        // paddingHorizontal: 15,
        borderBottomColor: COLORS.lightgrey,
        borderBottomWidth: 1,
        // borderWidth: 1,
        alignItems: "center",
        // backgroundColor: "lightblue",
    }
})

export default Input;