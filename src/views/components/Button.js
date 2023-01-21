import React from "react";
import { TouchableOpacity, Text } from "react-native";
import COLORS from "../../conts/colors";

const Button = ({
    title,
    onPress = () => {}
}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{ height: 60, width: "100%", backgroundColor: COLORS.blue, justifyContent: "center", alignItems: "center", borderRadius: 15, marginBottom: 20, marginTop: 10, }}>
            <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 20 }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button;