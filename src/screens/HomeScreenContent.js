import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class HomeScreenContent extends Component {
    render() {
        return (
            <React.Fragment>
                <Text>Home screen je tole</Text>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        alignSelf: 'stretch',
        marginTop: 50,
        marginRight: '15%',
        marginLeft: '15%',
        width: '70%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    }
});
