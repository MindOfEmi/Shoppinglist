import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faCheckSquare} from "@fortawesome/free-regular-svg-icons";

export function Items(props) {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.circular} />
                <Text style={styles.itemText}>{props.text.name}</Text>
            </View>
            <View><FontAwesomeIcon icon={faCheckSquare} size={32} style={{ color: "#74C0FC" }} /></View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },

    itemText: {
        maxWidth: "80%",
    },

    circular: {
        width: 15,
        height: 15,
        borderColor: "#55BCF6",
        borderWidth: 3,
        borderRadius: 10,
        marginRight: 10,
    },

});
