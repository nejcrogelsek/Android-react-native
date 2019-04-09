import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Button,
    TextInput,
    KeyboardAvoidingView,
    AsyncStorage,
    TouchableOpacity,
    StyleSheet,
    renderIf
} from 'react-native';
import { createStackNavigator, createAppContainer, StackNavigator, navigate, StackActions, NavigationActions, NavigationEvents } from 'react-navigation';

//import console = require('console');


export default class Me extends React.Component {

    //constructor
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            name: 'X',
        }
    }

    async componentDidMount() {

        //let testValue = 1;
        let value = await AsyncStorage.getItem('admin');
        //let storageEmail = await AsyncStorage.getItem('email');
        if (value != null) {

            this.setState({
                loggedin: true
            });

            //console.warn(this.state.name);

        }

        //console.warn(this.state.loggedin);

    }



    //Navigation
    goOnLogin() {
        this.props.navigation.navigate('Login');
    }

    goOnRegister() {
        this.props.navigation.navigate('Register');
    }



    logoutFunction = async () => {
        AsyncStorage.clear();

        this.setState({
            loggedin: false,
            name: 'X'
        });

        this.componentDidMount();

    }

    render() {



        return (
            <ScrollView>

                <NavigationEvents onDidFocus={() => this.componentDidMount()} />

                <View style={styles.container}>

                    {this.state.loggedin != true ? <TouchableOpacity
                        onPress={() => this.goOnLogin()}
                        style={styles.button}
                    >
                        <Text style={styles.TextStyle}> Sign In </Text>
                    </TouchableOpacity> : null}

                    {this.state.loggedin ? <TouchableOpacity
                        onPress={this.logoutFunction}
                        style={styles.button}
                    >
                        <Text style={styles.TextStyle}> Log Out </Text>
                    </TouchableOpacity> : null}

                    {this.state.loggedin != true ? <TouchableOpacity
                        onPress={() => this.goOnRegister()}
                        style={styles.button}
                    >
                        <Text style={styles.TextStyle}> Sign Up </Text>
                    </TouchableOpacity> : null}

                </View>

            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20
    },

    button: {
        width: '80%',
        backgroundColor: '#00BCD4',
        borderRadius: 7,
        marginTop: 20
    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        padding: 10
    },

});