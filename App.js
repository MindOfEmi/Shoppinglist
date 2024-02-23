import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Items } from "./components/items";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faRotate} from "@fortawesome/free-solid-svg-icons/faRotate";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons/faCartPlus";


export default function App() {
    const [task, setTask] = useState("");
    const [taskItems, setTaskItems] = useState([]);

    useEffect(() => {
        getItems();
    }, []);

    function getItems() {
        fetch('https://f679-141-147-61-180.ngrok-free.app/api/getItems')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(responseData => {
                setTaskItems(responseData);
            })
            .catch(error => console.error("Fetch error:", error));
    }

    async function handleAddTask() {
        if (task) {
            let targetTask = task;

            setTaskItems([...taskItems, task]);
            setTask("");

            const response = await fetch('https://f679-141-147-61-180.ngrok-free.app/api/addItem', {
                method: 'GET',
                headers: {
                    'name': targetTask,
                },
            });

            const data = await response.text();
            console.log('Response from server:', data);

            getItems();
        }
    }

    async function deleteTask(index) {
        let targetIndex = index;

        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);

        const response = await fetch('https://f679-141-147-61-180.ngrok-free.app/api/deleteItem', {
            method: 'GET',
            headers: {
                'name': taskItems[targetIndex].name,
            },
        });

        const data = await response.text();
        console.log('Response from server:', data);

        getItems();
    }

    return (
        <View style={styles.container}>

            {/* Shopping List */}
            <ScrollView style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Einkaufsliste     <TouchableOpacity onPress={getItems}><FontAwesomeIcon icon={faRotate} size={24} /></TouchableOpacity></Text>
                <View style={styles.items}>
                    {taskItems.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => deleteTask(index)}>
                            <Items text={item} />
                        </TouchableOpacity>
                    ))}
                    <Items text={{ name: "Listen Ende" }} />
                </View>
            </ScrollView>

            {/* Write a Task */}
            <View style={styles.writeTaskWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={"Produkt hinzufügen"}
                    value={task}
                    onChangeText={text => setTask(text)}
                />

                <TouchableOpacity onPress={handleAddTask}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}><FontAwesomeIcon icon={faCartPlus} size={24} /></Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },

    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },

    sectionTitle: {
        alignSelf: "center",
        paddingBottom: 20,
        fontSize: 40,
        fontWeight: "bold",
    },

    items: {
        marginTop: 30,
    },

    writeTaskWrapper: {
        bottom: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    input: {
        fontSize: 15,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#FFF",
        borderRadius: 25,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        width: "80%",
    },

    addText: {
        fontSize: 25,
    },

    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: "#FFF",
        borderRadius: 25,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
