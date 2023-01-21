import React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import COLORS from "../../conts/colors";

const Loader = ({ visible = false }) => {
    // const {height, width} = useWindowDimensions();

    return (visible && (
        <View style={[styles.container, {height: "100%", width: "100%"}]}>
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={COLORS.blue}></ActivityIndicator>
                <Text style={{ marginLeft: 15, fontSize: 18 }}>Processing Request</Text>
            </View>
        </View>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
    },
    loader: {
        height: 70,
        backgroundColor: COLORS.white,
        marginHorizontal: 50,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    }
});

export default Loader;