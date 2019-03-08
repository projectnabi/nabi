import React, { Component, } from 'react';
import { Alert, AppRegistry, Platform, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox'

export default class AddModal extends Component {
    componentWillMount() {
        this.setState({ color: this.props.color })
    }
    showAddModal = () => {
        this.refs.addModal.open()
    }

    render() {
        return (
            <Modal
                ref={"addModal"}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    shadowRadius: 10,
                    width: Dimensions.get('window').width - 80,
                    height: 280
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    // alert("MODAL CLOSED")
                }}>
                <Text style = {{fontSize : 25}}>Add Project!</Text>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Email"
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    onChangeText={this.handleEmail} />

                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    onChangeText={this.handlePassword} />

                <TouchableOpacity
                    style={styles.submitButton}
                    >
                    <Text style={styles.submitButtonText}> Submit </Text>
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
       width: 200,
       borderRadius: 5,
       height: 40,
       borderColor: 'gray',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: 'dodgerblue',
       padding: 10,
       justifyContent: 'center',
       alignItems: 'center',
       margin: 15,
       height: 40,
        width : 200,
       borderRadius : 5
    },
    submitButtonText:{
       color: 'white'
    }
 })