import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class AboutScreenContent extends Component {
    render() {
        return (
            <React.Fragment>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}>ABOUT US</Text>
                        <Text style={styles.paragraph}>
                            Since in today's years there are always more young people and children for computers, TVs and telephones, and thus reducing their sports development and healthier life, "we" are in Slovenj Gradec, where young people and the elderly hang out on a skatepark, the Concrete Jungle Society (CJ), with which we want to show ourselves in our natural talent, hoping to excite children, young people also older to move and sports.
                            The only name for the company is connected with the plan of the new skatepark in Slovenj Gradec, which should be one of the best in Slovenia.
                        </Text>
                        <Image
                            source={require('../../images/roundLogo.png')}
                            style={{ width: 300, height: 300 }}
                        />
                    </View>
                </ScrollView>
            </React.Fragment>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        padding: 20
    },
    paragraph: {
        padding: 24,
        fontSize: 14,
        fontWeight: "300",
        textAlign: 'center',
        color: '#111',
    },
    title: {
        fontSize: 24,
        color: "#111",
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: "700",
    }
});