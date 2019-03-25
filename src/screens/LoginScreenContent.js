import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet, ScrollView } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { Link } from 'react-router-dom';
import t from 'tcomb-form-native';
import A from 'react-native-a';

const Form = t.form.Form;

const User = t.struct({
    email: t.String,
    password: t.String,
});

const options = {
    fields: {
        email: {
            error: 'Email is required'
        },
        password: {
            error: 'Password is required'
        },
    },
};

export default class LoginScreenContent extends Component {

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.paragraph}>
                        LOGIN
                </Text>
                    <Form
                        ref={c => this._form = c} //Assign a ref
                        type={User}
                        options={options}
                    />
                    <Button
                        title="Submit"
                        onPress={this.handleSubmit}
                    />
                    <A href="./components/RegisterScreenContent">Register</A>
                </View>
            </ScrollView>
        )
    }
}

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10
        },
    },
    controlLabel: {
        normal: {
            color: 'blue',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        },
        // the style applied when a validation error occours
        error: {
            color: 'red',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});
