import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native'
import { Container, Form, Item, Input, Button, H1 } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Edit = ({ navigation, route }) => {

    const [name, setName] = useState('')
    const [totalNoOfSeason, setTotalNoOfSeason] = useState('')
    const [id, setId] = useState(null)

    useEffect(() => {
        const { series } = route.params
        const { id, name, totalNoOfSeason } = series
        setId(id)
        setName(name)
        setTotalNoOfSeason(totalNoOfSeason)
    }, [])

    const update = async () => {
        try {

            if (!name || !totalNoOfSeason) {
                Alert.alert("Please enter the values")
                return
            }

            // const seriesToUpdate = {
            //     id, name, totalNoOfSeason, isWatched: false
            // }

            const storedVal = await AsyncStorage.getItem('@series_list')
            const list = await JSON.parse(storedVal)

            list.map((series) => {
                if (series.id == id) {
                    series.name = name;
                    series.totalNoOfSeason = totalNoOfSeason
                    series.isWatched = false
                }
                return series
            })

            await AsyncStorage.setItem('@series_list', JSON.stringify(list))

            navigation.navigate('Home')

        } catch (err) {
            console.log(error);
        }
    }

    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <H1 style={styles.heading}>Edit Series</H1>
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
                    <Button rounded block onPress={update}>
                        <Text style={{ color: "#eee" }}>Save</Text>
                    </Button>
                </Form>
            </ScrollView>
        </Container>
    )
}

export default Edit
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
    },
});
