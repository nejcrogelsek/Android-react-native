import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, Alert, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class MembersScreenContent extends Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.ageInput = React.createRef();
        this.emailInput = React.createRef();
        this.state = {
            TextInputName: '',
            TextInputAge: '',
            TextInputEmail: '',
            refreshing: false,
            isLoading: true,
            dataSource: null,
        };
    }

    componentDidMount() {
        return fetch('https://concrete-jungle.rogelsek.eu/api/apiMember')
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

        const Name = this.state.TextInputName;
        const Age = this.state.TextInputAge;
        const Email = this.state.TextInputEmail;
        //console.warn(Title + "----" + Desc);

        fetch('https://concrete-jungle.rogelsek.eu/api/postMember/submit_member_info.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: Name,
                age: Age,
                email: Email
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                //console.warn("I'm in!" + Title + "----" + Desc);
                // Showing response message coming from server after inserting records.
                Alert.alert(responseJson);
            }).catch((error) => {
                console.error(error);
            });

        this.nameInput.current.clear();
        this.ageInput.current.clear();
        this.emailInput.current.clear();

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
                    <Text style={styles.item}>{val.id}</Text>
                    <Text style={styles.item}>{val.name}</Text>
                    <Text style={styles.item}>{val.age}</Text>
                    <Text style={styles.item}>{val.email}</Text>
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
                            placeholder="Enter Name"

                            ref={this.nameInput}

                            onChangeText={(TextInputName) => this.setState({ TextInputName })}

                            // Making the Under line Transparent.
                            underlineColorAndroid='transparent'

                            style={styles.TextInputStyleClass}
                        />

                        <TextInput

                            // Adding hint in Text Input using Place holder.
                            placeholder="Enter Age"

                            ref={this.ageInput}

                            onChangeText={(TextInputAge) => this.setState({ TextInputAge })}

                            // Making the Under line Transparent.
                            underlineColorAndroid='transparent'

                            style={styles.TextInputStyleClass}
                        />

                        <TextInput

                            // Adding hint in Text Input using Place holder.
                            placeholder="Enter Email"

                            ref={this.emailInput}

                            onChangeText={(TextInputEmail) => this.setState({ TextInputEmail })}

                            // Making the Under line Transparent.
                            underlineColorAndroid='transparent'

                            style={styles.TextInputStyleClass}
                        />

                        <Button title="Insert Text Input Data to Server" onPress={this.InsertDataToServer} color="#2196F3" />

                        {data}
                    </View>
                </ScrollView>
            )
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
        flexDirection: 'row',
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
    item: {
        paddingRight: 10
    }
});

