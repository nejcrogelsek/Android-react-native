import React from 'react';
import { Text, View, Button, Image, TouchableHighlight } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import HomeScreenContent from './src/screens/HomeScreenContent';
import LoginScreenContent from './src/screens/LoginScreenContent';
import RegisterScreenContent from './src/screens/RegisterScreenContent';
import MembersScreenContent from './src/screens/MembersScreenContent';
import GalleryScreenContent from './src/screens/GalleryScreenContent';
import AboutScreenContent from './src/screens/AboutScreenContent';
import ContactScreenContent from './src/screens/ContactScreenContent';

class LogoHome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Image
          source={require('./images/home.png')}
          style={{ width: 30, height: 30, marginLeft: 10 }}
        />
      </React.Fragment>
    );
  }
}

class HomeScreen extends React.Component {

  static navigationOptions = {
    headerTitle: <LogoHome />,
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <HomeScreenContent />
      </View>
    );
  }
}

class LogoMembers extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Image
          source={require('./images/members.svg')}
          style={{ width: 30, height: 30, marginLeft: 10 }}
        />
      </React.Fragment>
    );
  }
}

class MembersScreen extends React.Component {

  static navigationOptions = {
    headerTitle: <LogoMembers />,
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <MembersScreenContent />
      </View>
    );
  }
}

class LogoGallery extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Image
          source={require('./images/gallery.png')}
          style={{ width: 30, height: 30, marginLeft: 10 }}
        />
      </React.Fragment>
    );
  }
}

class GalleryScreen extends React.Component {

  static navigationOptions = {
    headerTitle: <LogoGallery />,
  };

  render() {
    return (
      <React.Fragment>
        <GalleryScreenContent />
      </React.Fragment>
    );
  }
}

class LogoAbout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Image
          source={require('./images/about.png')}
          style={{ width: 30, height: 30, marginLeft: 10 }}
        />
      </React.Fragment>
    );
  }
}

class AboutScreen extends React.Component {

  static navigationOptions = {
    headerTitle: <LogoAbout />,
  };

  render() {
    return (
      <View>
        <AboutScreenContent />
      </View>
    );
  }
}

class LogoContact extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Image
          source={require('./images/contact.svg')}
          style={{ width: 30, height: 30, marginLeft: 10 }}
        />
      </React.Fragment>
    );
  }
}

class ContactScreen extends React.Component {

  static navigationOptions = {
    headerTitle: <LogoContact />,
  };

  render() {
    return (
      <React.Fragment>
        <ContactScreenContent />
      </React.Fragment>
    );
  }
}

class LogoLogin extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Image
          source={require('./images/home.png')}
          style={{ width: 30, height: 30, marginLeft: 10 }}
        />
      </React.Fragment>
    );
  }
}

class LoginScreen extends React.Component {

  static navigationOptions = {
    headerTitle: <LogoLogin />,
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

/*
const { navigate } = this.props.navigation; -> needs to be between render and return in login screen

//Button needs to be in login screen
--------------------------------
<Button
          title="Go to register"
          onPress={() => navigate("Register", { screen: "RegisterScreen" })}
        />
--------------------------------
const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
});

const App = createAppContainer(MainNavigator, TabNavigator);

export default App;*/

const TabNavigator = createMaterialTopTabNavigator({
  Home: HomeScreen,
  Members: MembersScreen,
  Gallery: GalleryScreen,
  About: AboutScreen,
  Contact: ContactScreen,
  Login: LoginScreen,
  Register: RegisterScreen
});

export default createAppContainer(TabNavigator);