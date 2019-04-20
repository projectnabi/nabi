import React, { Component, } from 'react';
import { Alert, AppRegistry, Button, Platform, StyleSheet, Text, TextInput, Image, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title : null,
        };
      }
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
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}
                position='center'
                backdrop={true}
                visible={this.state.visibleModal}
                >
                <TouchableOpacity style={styles.close}>
                    <Ionicons name="ios-arrow-down" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.more}>
                    <Ionicons name="md-more" size={24} color="black" />
                </TouchableOpacity>
                <Image style = {{width: 120,height: 120, resizeMode: 'contain', alignSelf: 'center'}} source = {require("../assets/EGG.png")}/>
                <View style={{alignSelf: 'stretch', paddingLeft: 37, paddingTop:20, paddingBottom: 10}}>
                    <Text style={styles.projectTitle}>PROJECT NAME</Text>
                </View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Title"
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    onChangeText={(text) => this.setState({text})} />
                <TouchableOpacity
                    style={styles.submitButton}>
                    
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
        fontSize: 40,
        width: 300,
        height: 40,
        padding: 0,
    },
    projectTitle: {
        fontSize: 12,
    },
    submitButton: {
        backgroundColor: '#ceeeb0',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        height: 40,
        width: 150,
        borderRadius: 5,
        borderBottomColor: 'green'
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
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        paddingTop: 20,
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
         // shadowColor: '#000',
         // shadowOffset: { width: 0, height: 2 },
         // shadowOpacity: 0.8,
         // shadowRadius: 2,
         top: 10,
         right: 10,
         height: 70,
         backgroundColor: '#fff',
         borderRadius: 100,
         paddingBottom: 40,
       }
})