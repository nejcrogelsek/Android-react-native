import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, Alert, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { BorderlessButton } from 'react-native-gesture-handler';

export default class HomeScreenContent extends Component {

    constructor(props) {
        super(props)
        this.titleInput = React.createRef();
        this.descInput = React.createRef();
        this.state = {
            TextInputTitle: '',
            TextInputDesc: '',
            refreshing: false,
            isLoading: true,
            dataSource: null
        }
    }

    componentDidMount() {
        return fetch('https://concrete-jungle.rogelsek.eu/api/apiArticle')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    InsertDataToServer = () => {

        const Title = this.state.TextInputTitle;
        const Desc = this.state.TextInputDesc;
        //console.warn(Title + "----" + Desc);

        fetch('https://concrete-jungle.rogelsek.eu/api/postArticle/submit_article_info.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newsTitle: Title,
                newsDescription: Desc
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                //console.warn("I'm in!" + Title + "----" + Desc);
                // Showing response message coming from server after inserting records.
                Alert.alert(responseJson);
            }).catch((error) => {
                console.error(error);
            });

        this.titleInput.current.clear();
        this.descInput.current.clear();

    }

    handleRefresh() {
        this.componentDidMount();

        this.setState({
            refreshing: false
        })
    }


    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        } else {
            let data = this.state.dataSource.map((val, key) => {

                return <View key={key} style={styles.items}>
                    <Text style={styles.title}>{val.newsTitle}</Text>
                    <Text style={styles.desc}>{val.newsDescription}</Text>
                </View>
            });

            return (

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => this.handleRefresh()}
                            refreshing={this.state.refreshing}
                        />
                    }
                >
                    <View style={styles.MainContainer}>

                        <TextInput

                            // Adding hint in Text Input using Place holder.
                            placeholder="Enter Title"

                            ref={this.titleInput}

                            onChangeText={(TextInputTitle) => this.setState({ TextInputTitle })}

                            // Making the Under line Transparent.
                            underlineColorAndroid='transparent'

                            style={styles.TextInputStyleClass}
                        />

                        <TextInput

                            // Adding hint in Text Input using Place holder.
                            placeholder="Enter Description"

                            ref={this.descInput}

                            onChangeText={(TextInputDesc) => this.setState({ TextInputDesc })}

                            // Making the Under line Transparent.
                            underlineColorAndroid='transparent'

                            style={styles.TextInputStyleClass}
                        />

                        <Button

                            title="Insert Text Input Data to Server"
                            onPress={this.InsertDataToServer} color="#2196F3"

                        />


                        {data}
                    </View>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    items: {
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
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    desc: {
        fontSize: 14
    }

});