import React, { Component, } from 'react';
import { Alert, AppRegistry, Platform, StyleSheet, Text, TextInput, Image, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default class AddModal extends Component {
    componentWillMount() {
        this.setState({ color: this.props.color })
    }
    showAddModal = () => {
        this.refs.addModal.open()
    }

    render() {
        return (
            <Modal backdropPressToClose={false} backButtonClose={true}
                ref={"addModal"}
                style={{
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    borderRadius: 5,
                    shadowRadius: 10,
                    width: Dimensions.get('window').width - 20,
                    //  height: 280,
                    flex: .9
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    // alert("MODAL CLOSED")
                }}>
                <TouchableOpacity
                    style={styles.close}>
                    <Ionicons name="ios-close" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.more}>
                    <Ionicons name="md-more" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 25 }}>Add Project!</Text>
                <Image style={{ width: 120, height: 120, resizeMode: 'contain' }} source={require("../assets/EGG.png")} />
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Title"
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    onChangeText={this.handleEmail} />

                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Bird Name"
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    onChangeText={this.handlePassword} />

                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Frequency"
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    onChangeText={this.handlePassword} />

                <TouchableOpacity
                    style={styles.submitButton}
                >
                    <Text style={styles.submitButtonText}> Done </Text>
                </TouchableOpacity>

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 10,
        width: 300,
        borderRadius: 5,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#ceeeb0',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        height: 40,
        width: 300,
        borderRadius: 5
    },
    submitButtonText: {
        color: 'white',
        fontWeight: "bold"
    }, close: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        top: 10,
        left: 10,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 100,
    },
    more: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        top: 10,
        right: 10,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 100,
    }
})