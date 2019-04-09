import React, { Component } from 'react';

import {
    Text,
    View,
    ScrollView,
    Button,
    TextInput,
    KeyboardAvoidingView,
    AsyncStorage,
    StyleSheet,
    TouchableOpacity,
    Alert,
    forceRemount
} from 'react-native';

// Importing Stack Navigator library to add multiple activities.
import { createStackNavigator } from 'react-navigation';
import { ThemeConsumer } from 'react-native-elements';

// Creating Login Activity.
export default class LoginScreenContent extends Component {

    constructor(props) {

        super(props)
        this.UserLoginFunction = this.UserLoginFunction.bind(this);
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.state = {
            email: 'velavelavela@gmail.com',
            password: 'test123',
            loginCheckExist: 'no',
            userID: 0,
            admin: 0,
            name: 'testAPI'
        }

    }

    UserLoginFunction = async () => {

        //const { UserEmail } = this.state;
        //const { UserPassword } = this.state;


        fetch('https://concrete-jungle.rogelsek.eu/api/login/User_Login.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                email: this.state.email,

                password: this.state.password

            })

        }).then((response) => response.json())
            .then((response) => {

                // If server response message same as Data Matched
                if (response === 'Data Matched') {

                    //new values in AsyncStorage
                    //AsyncStorage.setItem('email', JSON.stringify(response.email));
                    AsyncStorage.setItem('admin', JSON.stringify(0));

                    //console.warn(JSON.stringify(response.admin));

                    /*this.setState({
                        loginCheckExist: response.exist,
                        userID: response.id,
                        admin: response.admin,
                        name: response.name
                    }, () => console.warn(response));*/

                    //Alert if the user is successful auth
                    Alert.alert(response);
                    this.props.navigation.navigate('MeHome');


                } else if (response === 'Admin') {

                    //AsyncStorage.setItem('email', JSON.stringify(response.email));
                    //AsyncStorage.setItem('admin', JSON.stringify(response.admin));
                    AsyncStorage.setItem('admin', JSON.stringify(1));

                    /*this.setState({
                        loginCheckExist: response.exist,
                        userID: response.id,
                        admin: response.admin,
                        name: response.name
                    }, () => console.warn(response));*/

                    //Alert if the user is successful auth
                    Alert.alert(response);
                    this.props.navigation.navigate('MeHome');
                }
                else {

                    Alert.alert(response, { cancelable: false });
                }

            }).catch((error) => {
                console.error(error);
            });

        this.emailInput.current.clear();
        this.passwordInput.current.clear();
    }

    render() {
        return (

            <View>
                <Text style={styles.TextComponentStyle}>User Login Form</Text>

                <TextInput

                    // Adding hint in Text Input using Place holder.
                    placeholder="Enter User Email"

                    ref={this.emailInput}

                    onChangeText={(email) => this.setState({ email })}

                    // Making the Under line Transparent.
                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}
                />

                <TextInput

                    // Adding hint in Text Input using Place holder.
                    placeholder="Enter User Password"

                    ref={this.passwordInput}

                    onChangeText={(password) => this.setState({ password })}

                    // Making the Under line Transparent.
                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}

                    secureTextEntry={true}
                />

                <Button title="Click Here To Login" onPress={this.UserLoginFunction} color="#2196F3" />



            </View>

        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        margin: 10,
    },

    TextInputStyleClass: {

        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        // Set border Hex Color Code Here.
        borderColor: '#2196F3',

        // Set border Radius.
        borderRadius: 5,

    },

    TextComponentStyle: {
        fontSize: 20,
        color: "#000",
        textAlign: 'center',
        marginBottom: 15
    },

    unosTexta: {
        backgroundColor: '#00BFFF',
        width: '70%',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: '2%',
    },

    posaljiDugme: {
        backgroundColor: '#00B2EE',
        textAlign: 'center',
        color: 'white',
        width: '70%',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: '2%'
    }
});