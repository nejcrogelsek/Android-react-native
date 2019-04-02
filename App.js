import React, { Component } from 'react';
import { Text, View, Button, Image, TouchableHighlight } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import HomeScreenContent from './src/screens/HomeScreenContent';
import LoginScreenContent from './src/screens/LoginScreenContent';
import RegisterScreenContent from './src/screens/RegisterScreenContent';
import MembersScreenContent from './src/screens/MembersScreenContent';
import GalleryScreenContent from './src/screens/GalleryScreenContent';
import AboutScreenContent from './src/screens/AboutScreenContent';
import ContactScreenContent from './src/screens/ContactScreenContent';


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <HomeScreenContent />
      </View>
    );
  }
}

class MembersScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <MembersScreenContent />
      </View>
    );
  }
}

class GalleryScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GalleryScreenContent />
      </React.Fragment>
    );
  }
}

class AboutScreen extends React.Component {
  render() {
    return (
      <View>
        <AboutScreenContent />
      </View>
    );
  }
}

class ContactScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ContactScreenContent />
      </React.Fragment>
    );
  }
}

class LoginScreen extends React.Component {

  // Setting up LoginScreen title.
  static navigationOptions =
    {
      title: 'Sign in',
    };

  render() {
    return (
      <View>
        <LoginScreenContent />
      </View>
    );
  }
}

class RegisterScreen extends React.Component {
  render() {
    return (
      <View>
        <RegisterScreenContent />
      </View>
    );
  }
}

class ProfileScreen extends Component {

  // Setting up ProfileScreen title.
  static navigationOptions =
    {
      title: 'ProfileScreen',

    };


  render() {

    const { goBack } = this.props.navigation;

    return (
      <View>

        <Text style={styles.TextComponentStyle}> {this.props.navigation.state.params.Email} </Text>

        <Button title="Click here to Logout" onPress={() => goBack(null)} />

      </View>
    );
  }
}

/*const LoginTab = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#fff',
      title: 'Sign in',
    },
  }
);*/

const LoginTab = createStackNavigator(
  {
    First: { screen: LoginScreen },

    Second: { screen: ProfileScreen }

  });

const MainApp = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Members: MembersScreen,
    Gallery: GalleryScreen,
    About: AboutScreen,
    Contact: ContactScreen,
    Login: LoginTab
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return (
            <Image
              source={require('./images/home.png')}
              style={{ width: 20, height: 20 }} />
          );
        } else if (routeName === 'Members') {
          return (
            <Image
              source={require('./images/members.png')}
              style={{ width: 20, height: 20 }} />
          );
        } else if (routeName === 'Gallery') {
          return (
            <Image
              source={require('./images/gallery.png')}
              style={{ width: 20, height: 20 }} />
          );
        } else if (routeName === 'About') {
          return (
            <Image
              source={require('./images/about.png')}
              style={{ width: 20, height: 20 }} />
          );
        } else if (routeName === 'Contact') {
          return (
            <Image
              source={require('./images/mail.png')}
              style={{ width: 20, height: 20 }} />
          );
        } else if (routeName === 'Login') {
          return (
            <Image
              source={require('./images/login.png')}
              style={{ width: 20, height: 20 }} />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
  }
);


export default createAppContainer(MainApp, LoginTab);