import React, { Component, } from 'react';
import { KeyboardAvoidingView, AppRegistry, Button, Platform, Modal, StyleSheet, Text, TextInput, Image, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { addProject } from '../store/actions'
import DatePicker from './DatePicker';

class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            name: "",
            visibleModal: false
        };
    }
    componentWillMount() {
        this.setState({ color: this.props.color })
    }

    closeModal() {
        this.setState({visibleModal:false})
    }

    openModal() {
        this.setState({visibleModal:true})
    }

    _onPressButton = () => {
        if (this.state.title.length > 0 && this.state.name.length > 0) {
            this.props.dispatch(addProject(Date.now(), { title: this.state.title, name: this.state.name, img: 'egg', health: 100, markedDates: {} }))
            this.closeModal()
        }
    }

    render() {
        return (
            <Modal 
                ref={"addModal"}
                position='center'
                backdrop={true}
                visible={this.state.visibleModal}
                onRequestClose={() => console.log('modal closed')}
            >
                <KeyboardAvoidingView
                behavior="padding"
                style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                    <TouchableOpacity style={styles.close} onPress={()=> this.closeModal()}>
                        <Ionicons name="ios-close" size={40} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.more}>
                        <Ionicons name="md-more" size={24} color="black" />
                    </TouchableOpacity>
                    <Image style={{ width: 120, height: 120, resizeMode: 'contain', alignSelf: 'center' }} source={require("../assets/addEgg.png")} />
                    <View style={{ alignSelf: 'stretch', paddingLeft: 37, paddingTop: 20, paddingBottom: 10 }}>
                        <Text style={styles.projectTitle}>PROJECT NAME</Text>
                    </View>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Title"
                        placeholderTextColor="gray"
                        autoCapitalize="sentences"
                        onChangeText={(title) => { this.setState({ title }) }} />

                    <View style={{ alignSelf: 'stretch', paddingLeft: 37, paddingTop: 20, paddingBottom: 10 }}>
                        <Text style={styles.projectTitle}>BIRD NAME</Text>
                    </View>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Name"
                        placeholderTextColor="gray"
                        autoCapitalize="words"
                        onChangeText={(name) => { this.setState({ name }) }} />
                    <View style={{ alignSelf: 'stretch', paddingLeft: 37, paddingTop: 20, paddingBottom: 10 }}>
                        <Text style={styles.projectTitle}>Frequency</Text>
                    </View>
                    <DatePicker/>
                    <TouchableOpacity style={styles.submitButton}
                        activeOpacity={this.state.title.length > 0 && this.state.name.length > 0 ? 0.5 : 1}
                        onPress={this._onPressButton}>
                        <Text style={styles.submitButtonText}> Done </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Modal>
        );
    }
}
AddModal = connect(null, null, null, { forwardRef: true })(AddModal)
export default AddModal

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    title: {
        fontSize: 48,
        alignSelf: 'center',
        paddingBottom: 30
    },
    input: {
        fontSize: 40,
        width: 300,
        height: 40,
    },
    projectTitle: {
        alignSelf: 'flex-start',
        fontSize: 12,
    },
    submitButton: {
        backgroundColor: '#ceeeb0',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 15,
        height: 40,
        width: 150,
        borderRadius: 5,
        borderBottomColor: 'gray'
    },
    submitButtonText: {
        color: 'white',
        fontWeight: "bold"
    },
    close: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        paddingTop: 20,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 100,
        position: 'absolute',
        left: 0, 
        top: 10,
    },
    more: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        top: 10,
        right: 0,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 100,
        paddingTop: 20,
    }
})