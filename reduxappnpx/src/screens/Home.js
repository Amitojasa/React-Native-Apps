
import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import {
    List,
    ListItem,
    Left,
    Button,
    Icon,
    Body,
    Text,
    Right,
    Switch,
    CheckBox,
    Title,
    Subtitle,
    H1,
    Fab,
    Container,
    Content,
} from 'native-base';
// import { removeSeries, markComplete } from "./action/list"
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { markComplete, removeSeries } from '../action/list';

// TODO: action to perform in redux

const Home = ({ navigation, removeSeries, markComplete, listState }) => {
    // if the length of the series is zero then rendering container with the message
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {listState.length == 0 ? (
                <Container style={styles.emptyContainer}>
                    <H1 style={styles.heading}>
                        Watch list is empty, start by adding one
                    </H1>
                </Container>
            ) : (
                <Content padder>
                    <H1 style={styles.heading}>Next Series to Watch</H1>
                    <List>
                        {listState.map((series) => (
                            <ListItem icon key={series.id} style={styles.listItem} noBorder>

                                <Left>
                                    <Button
                                        style={styles.actionButton}
                                        onPress={() => {
                                            console.log(series.id);
                                            removeSeries(series.id);
                                        }}
                                        danger>
                                        <Icon active name="trash" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Title style={styles.seriesName}>{series.name}</Title>
                                    <Text note> {series.totalNoSeries} series to watch </Text>
                                </Body>
                                <Right>

                                    <CheckBox
                                        checked={series.isWatched}
                                        onPress={() => {
                                            console.log(series)
                                            markComplete(series.id)
                                        }}
                                    />
                                </Right>
                            </ListItem>
                        ))}
                    </List>
                </Content>
            )}

            <Fab
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => navigation.navigate('Add')}>
                <Icon name="add" />
            </Fab>
        </ScrollView>
    );
};

//TODO: redux config

const mapStateToProps = (state) => ({
    listState: state.list
})

const mapDispatchToProps = {
    removeSeries: (id) => removeSeries(id),
    markComplete: (id) => markComplete(id)
}


Home.propTypes = {
    removeSeries: propTypes.func.isRequired,
    markComplete: propTypes.func.isRequired,
    listState: propTypes.array.isRequired

}

//TODO: Redux export
export default connect(mapStateToProps, mapDispatchToProps)(Home);

// empty container style will be work in the loading as well as the empty message screen
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
    seriesName: {
        color: '#fdcb9e',
        textAlign: 'justify',
    },
    listItem: {
        marginLeft: 0,
        marginBottom: 20,
    },
});
