import React, { Component } from 'react';

import { StyleSheet, TextInput, View, Alert, Button, Text } from 'react-native';

export default class RegisterScreenContent extends Component {

    constructor(props) {

        super(props)

        this.state = {

            UserName: '',
            UserEmail: '',
            UserPassword: ''

        }

    }

    UserRegistrationFunction = () => {


        const { UserName } = this.state;
        const { UserEmail } = this.state;
        const { UserPassword } = this.state;



        fetch('https://concrete-jungle.rogelsek.eu/api/registration/user_registration.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                name: UserName,

                email: UserEmail,

                password: UserPassword

            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // Showing response message coming from server after inserting records.
                Alert.alert(responseJson);

            }).catch((error) => {
                console.error(error);
            });


    }

    render() {
        return (

            <View>

                <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>User Registration Form</Text>

                <TextInput

                    // Adding hint in Text Input using Place holder.
                    placeholder="Enter User Name"

                    onChangeText={UserName => this.setState({ UserName })}

                    // Making the Under line Transparent.
                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}
                />

                <TextInput

                    // Adding hint in Text Input using Place holder.
                    placeholder="Enter User Email"

                    onChangeText={UserEmail => this.setState({ UserEmail })}

                    // Making the Under line Transparent.
                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}
                />

                <TextInput

                    // Adding hint in Text Input using Place holder.
                    placeholder="Enter User Password"

                    onChangeText={UserPassword => this.setState({ UserPassword })}

                    // Making the Under line Transparent.
                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}

                    secureTextEntry={true}
                />

                <Button title="Click Here To Register" onPress={this.UserRegistrationFunction} color="#2196F3" />



            </View>

        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        margin: 10
    },

    TextInputStyleClass: {

        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        // Set border Hex Color Code Here.
        borderColor: '#2196F3',

        // Set border Radius.
        borderRadius: 5
    },

});