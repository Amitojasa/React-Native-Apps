
import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Text,
    Button,
    H1,
} from 'native-base';


import propTypes from 'prop-types'
import shortid from 'shortid';
import { addSeries } from "../action/list"
import { connect } from 'react-redux'

const Add = ({ navigation, addSeries }) => {
    // to hold name of the series and total no of the series
    const [name, setName] = useState('');
    const [totalNoSeries, setTotalNoSeries] = useState('');

    // to add the current series into list and then move to the home screen
    const handleSubmit = async () => {
        try {

            if (!name || !totalNoSeries) {
                return alert("Please add both fields")
            }

            const seriesToAdd = {
                id: shortid.generate(),
                name,
                totalNoSeries,
                isWatched: false
            }
            console.log(seriesToAdd)

            addSeries(seriesToAdd)
            navigation.navigate("Home")

        } catch (error) {
            console.log(error)
        }
    };
    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <H1 style={styles.heading}>Add To watch List</H1>

                <Form>
                    <Item rounded style={styles.formItem}>
                        <Input
                            placeholder="Series Name"
                            value={name}
                            style={{ color: '#eee' }}
                            onChangeText={(text) => setName(text)}
                        />
                    </Item>
                    <Item rounded style={styles.formItem}>
                        <Input
                            placeholder="Total number of series"
                            value={totalNoSeries}
                            style={{ color: '#eee' }}
                            onChangeText={(text) => setTotalNoSeries(text)}
                        />
                    </Item>
                    <Button rounded block onPress={handleSubmit}>
                        <Text>Add</Text>
                    </Button>
                </Form>
            </ScrollView>
        </Container>
    );
};

//TODO: Redux config

const mapDispatchToProps = {
    addSeries: (data) => addSeries(data)
}


Add.propTypes = {
    addSeries: propTypes.func.isRequired
}


//TODO: Redux Export
export default connect(null, mapDispatchToProps)(Add);

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
