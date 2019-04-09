import React from 'react';
import { View, Text, Button } from "react-native";
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";
import { Icon } from 'react-native-elements';

//TABS
import Me from './Me';

//ME TABS
import RegisterScreenContent from './RegisterScreenContent';
import LoginScreenContent from './LoginScreenContent';



//ME STACK 
export const meStack = createStackNavigator({


    //ZAČETNI SCREEN 
    MeHome: {
        screen: Me,
        navigationOptions: {
            unmountInactiveRoutes: true,
            title: 'Profile'
        }
    },

    //REGISTER
    Register: {
        screen: RegisterScreenContent,
        navigationOptions: {
            title: 'Sign Up'
        },
    },

    //LOGIN 
    Login: {
        screen: LoginScreenContent,
        navigationOptions: {
            unmountInactiveRoutes: true,
            title: 'Sign In'
        },
    },


},
    {
        initialRouteName: "MeHome"
    },

);