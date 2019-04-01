import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    ListView,
    Platform,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { ScrollView } from 'react-native-gesture-handler';


export default class GalleryScreenContent extends Component {

    constructor() {
        super();
        this.tagInput = React.createRef();
        this.state = {
            isLoading: true,
            ImageSource: null,
            data: null,
            image_tag: '',
            refreshing: false

        }
    }

    GetItem(image_tag) {

        Alert.alert(image_tag);

    }

    componentDidMount() {

        return fetch('https://concrete-jungle.rogelsek.eu/api/Project/ImagesList.php')
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                this.setState({
                    ImageSource: source,
                    data: response.data
                });
            }
        });
    }

    uploadImageToServer = () => {

        RNFetchBlob.fetch('POST', 'https://concrete-jungle.rogelsek.eu/api/Project/upload_image.php', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [
                { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
                { name: 'image_tag', data: this.state.image_tag }
            ]).then((resp) => {

                var tempMSG = resp.data;

                tempMSG = tempMSG.replace(/^"|"$/g, '');
                Alert.alert(tempMSG);
                //console.warn(resp);

            }).catch((err) => {
                // ...
            })

        this.tagInput.current.clear();
        this.state.ImageSource = null;
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
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={() => this.handleRefresh()}
                        refreshing={this.state.refreshing}
                    />
                }
            >
                <View style={styles.container}>

                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

                        <View style={styles.ImageContainer}>

                            {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
                                <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                            }

                        </View>

                    </TouchableOpacity>

                    <TextInput
                        placeholder="Enter Image Name "
                        ref={this.tagInput}
                        onChangeText={data => this.setState({ image_tag: data })}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyle}
                    />

                    <TouchableOpacity onPress={this.uploadImageToServer} activeOpacity={0.6} style={styles.button} >

                        <Text style={styles.TextStyle}> UPLOAD IMAGE TO SERVER </Text>

                    </TouchableOpacity>

                    <View style={styles.MainContainer}>

                        <ListView

                            dataSource={this.state.dataSource}

                            renderSeparator={this.ListViewItemSeparator}

                            renderRow={(rowData) =>

                                <View style={{ flex: 1, flexDirection: 'row' }}>

                                    <Image source={{ uri: rowData.image_path }} style={styles.imageViewContainer} />

                                    <Text onPress={this.GetItem.bind(this, rowData.image_tag)} style={styles.textViewContainer} >{rowData.image_tag}</Text>

                                </View>
                            }
                        />

                    </View>

                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingTop: 20
    },

    ImageContainer: {
        borderRadius: 10,
        width: 250,
        height: 250,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDDC39',

    },

    TextInputStyle: {

        textAlign: 'center',
        height: 40,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#028b53',
        marginTop: 20
    },

    button: {

        width: '80%',
        backgroundColor: '#00BCD4',
        borderRadius: 7,
        marginTop: 20
    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        padding: 10
    },
    MainContainer: {
        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex: 1,
        margin: 5,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    imageViewContainer: {
        width: '50%',
        height: 100,
        margin: 10,
        borderRadius: 10
    },
    textViewContainer: {
        textAlignVertical: 'center',
        width: '50%',
        padding: 20
    }

});