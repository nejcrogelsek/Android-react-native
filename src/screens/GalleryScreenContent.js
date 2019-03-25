import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const options = {
    title: 'Select Photo',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'Choose from gallery',
    quality: 1
};

export default class GalleryScreenContent extends Component {

    constructor() {
        super()
        this.state = {
            imageSource: null,
            pic: null,
            imageIndex: 1
        }
    }

    selectPhoto() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    imageSource: source,
                    pic: response.data
                });
            }
        });
    }

    uploadPic = () => {
        RNFetchBlob.fetch('POST', 'https://concrete-jungle.rogelsek.eu/api/upload.php', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [
                { name: 'image', filename: 'avatar.png', data: this.state.pic }
            ]).then((resp) => {
                // ...
                console.log(resp);
                alert('Your image uploaded succesfully');
                this.setState({ imageSource: null })
            })
    }

    imageCounter() {
        //Counting images in folder
    }

    displayImage() {
        //Displaying images in folder
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={this.state.imageSource != null ? this.state.imageSource :
                            require("../../images/not_available.png")}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.selectPhoto.bind(this)}>
                        <Text style={styles.text}>Select</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={this.uploadPic}>
                        <Text style={styles.text}>Upload</Text>
                    </TouchableOpacity>



                </View>
                <Image source={{ uri: 'https://concrete-jungle.rogelsek.eu/api/images/12_avatar.png' }}
                    style={{ width: 350, height: 350, marginTop: 15 }} />
                <Image
                    source={require('../../images/roundLogo.png')}
                    style={{ width: 350, height: 350, marginTop: 15 }}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A0A0A0',
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
    image: {
        width: 200,
        height: 200,
        marginTop: 30
    }
});
