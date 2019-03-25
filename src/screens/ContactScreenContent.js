import React from 'react';
import { Text, View, Button, Image, StyleSheet, ScrollView, Linking, TouchableHighlight, TouchableOpacity } from 'react-native';
import email from 'react-native-email';

export default class App extends React.Component {

    handleEmail = () => {
        const to = ['nejc.rogelsek40@gmail.com']
        email(to, {
            subject: 'Subject',
            body: 'Ask me anything :)'
        }).catch(console.error)
    }

    render() {
        return (
            <ScrollView>
                <Text style={styles.paragraph}>Hello! Are you lonely and wanna have some fun with new friends? Do you like skateboarding? If you do like it then just write an email with subject: "Membership" and you can join us and we will start with shooting video of your skateboarding skills immediently :)</Text>
                <View style={styles.container}>
                    <View style={styles.flexBox}>
                        <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/concretexjungle.co/')}>
                            <Image
                                source={require('../../images/instaLogo.png')}
                                style={{ width: 110, height: 110, marginLeft: 8 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/concretexjungle/')}>
                            <Image
                                source={require('../../images/facebookLogo.png')}
                                style={{ width: 110, height: 110, marginLeft: 8 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/channel/UCKkqUbzy8bgzD_-HVmgFj0g')}>
                            <Image
                                source={require('../../images/youtubeLogo.png')}
                                style={{ width: 110, height: 110, marginLeft: 8 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={this.handleEmail}>
                        <Text style={styles.text}>Send Mail</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15
    },
    flexBox: {
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        width: 250,
        height: 50,
        backgroundColor: '#330066',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 15
    },
    text: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center'
    },
    paragraph: {
        padding: 24,
        fontSize: 14,
        fontWeight: "300",
        textAlign: 'center',
        color: '#111',
    },
})