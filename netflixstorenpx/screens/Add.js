import React, { useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Container, Form, Item, Input, Button, H1 } from 'native-base'
import shortid from 'shortid'

import AsyncStorage from '@react-native-async-storage/async-storage';
const Add = ({ navigation, route }) => {

    const [name, setName] = useState('');
    const [totalNoOfSeason, setTotalNoOfSeason] = useState('')


    const addToList = async () => {
        try {
            if (!name || !totalNoOfSeason) {
                return Alert.alert("Please add both fields");
            }

            const seriesToAdd = {
                id: shortid.generate(),
                name: name, // or name directly if key and value is same
                totalNoOfSeason: totalNoOfSeason,
                isWatched: false
            }
            setName('')
            setTotalNoOfSeason('')
            const storedValue = await AsyncStorage.getItem('@series_list');
            const prevList = await JSON.parse(storedValue);

            if (!prevList) {
                const newList = [seriesToAdd]
                await AsyncStorage.setItem('@series_list', JSON.stringify(newList))
            } else {
                prevList.push(seriesToAdd);
                await AsyncStorage.setItem('@series_list', JSON.stringify(prevList))
            }

            navigation.navigate('Home')

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <H1 style={styles.heading}>Add to watch list</H1>
                <Form style={{ marginHorizontal: 10 }}>
                    <Item rounded style={styles.formItem}>
                        <Input placeholder="Series name"
                            style={{ color: "#eee", marginHorizontal: 10 }}
                            value={name}
                            onChangeText={(text) => setName(text)}

                        />
                    </Item>
                    <Item rounded style={styles.formItem}>
                        <Input placeholder="Total no. of seasons"
                            style={{ color: "#eee", marginHorizontal: 10 }}
                            value={totalNoOfSeason}
                            onChangeText={(totalNoOfSeason) => setTotalNoOfSeason(totalNoOfSeason)}
                            keyboardType='numeric'
                        />
                    </Item>
                    <Button rounded block onPress={addToList}>
                        <Text style={{ color: "#eee" }}>Add</Text>
                    </Button>
                </Form>
            </ScrollView>
        </Container>
    )
}

export default Add


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1b262c',
        flex: 1,
        justifyContent: 'flex-start',
    },
    heading: {
        textAlign: 'center',
        color: '#00b7c2',
        marginHorizontal: 5,
        marginTop: 50,
        marginBottom: 20,
    },
    formItem: {
        marginBottom: 20,


        borderColor: "#758283",


    },
});
