import { H1, Button, Container, Fab, Icon, ListItem, List, Left, CheckBox, Body, Right, Title, Text, Spinner } from 'native-base'
import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({ navigation, route }) => {

    const [listOfSeries, setListOfSeries] = useState([])

    const [loading, setLoading] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        getList();
    }, [isFocused]);

    const getList = async () => {

        setLoading(true);


        const storedVal = await AsyncStorage.getItem('@series_list');

        if (!storedVal) {
            setListOfSeries([]);
        } else {

            const list = JSON.parse(storedVal);
            setListOfSeries(list);

        }

        setLoading(false);
    }


    const deleteSeries = async (id) => {
        const newList = await listOfSeries.filter((list) => list.id !== id)
        await AsyncStorage.setItem('@series_list', JSON.stringify(newList));

        setListOfSeries(newList)
    }

    const markCompleted = async (id) => {
        const newList = listOfSeries.map((list) => {
            if (list.id == id) {
                list.isWatched = !list.isWatched
            }

            return list
        })
        await AsyncStorage.setItem('@series_list', JSON.stringify(newList));

        setListOfSeries(newList)

    }


    if (loading) {
        return <Container style={styles.container}>
            <Spinner color="#00b7c2" />
        </Container>
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {
                listOfSeries.length == 0 ? (
                    <Container style={styles.container}>
                        <H1 style={styles.heading}>
                            Watchlist is empty. Please add a series
                        </H1>
                    </Container>

                ) : (
                    <Container style={styles.container}>
                        <H1 style={styles.heading}>Next series to watch</H1>
                        <List>
                            {listOfSeries.map((series) => (
                                <ListItem key={series.id} style={styles.listItem} noBorder>
                                    <Left>
                                        <Button style={styles.actionButton} danger onPress={() => {
                                            deleteSeries(series.id)
                                        }}>
                                            <Icon name="trash" active />
                                        </Button>
                                        <Button style={styles.actionButton} onPress={() => {
                                            navigation.navigate('Edit', { series })
                                        }}>
                                            <Icon active name="edit" type="Feather" />
                                        </Button>
                                    </Left>

                                    <Body>
                                        <Title style={styles.seasonName}>{series.name}</Title>
                                        <Text note>{series.totalNoOfSeason} seasons to watch</Text>
                                    </Body>

                                    <Right>
                                        <CheckBox
                                            checked={series.isWatched}
                                            onPress={() => markCompleted(series.id)}
                                        />
                                    </Right>

                                </ListItem>

                            ))}
                        </List>
                    </Container>

                )
            }


            <Fab
                style={{ backgroundColor: "#5067FF" }}
                position="bottomRight"
                onPress={() => navigation.navigate('Add')}
            ><Icon name="add" /></Fab>
        </ScrollView>
    )
}

export default Home


const styles = StyleSheet.create({
    emptyContainer: {
        backgroundColor: '#1b262c',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#1b262c',
        flex: 1,
    },
    heading: {
        textAlign: 'center',
        color: '#00b7c2',
        marginVertical: 15,
        marginHorizontal: 5,
    },
    actionButton: {
        marginLeft: 5,
    },
    seasonName: {
        color: '#fdcb9e',
        textAlign: 'justify',
    },
    listItem: {
        marginLeft: 0,
        marginBottom: 20,
    },
});
