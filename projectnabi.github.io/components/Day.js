import React, { Component} from 'react';
import {Button, View, TouchableOpacity, Text, StyleSheet} from 'react-native'

export default class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            pressed: false
        }
    }

    changeButton() {
        this.setState({pressed: !this.state.pressed})
        this.props.pressed(this.props.title, !this.state.pressed)
    }

    render() {
        return (
            <View style={styles.dates}>
                <TouchableOpacity onPress={this.changeButton.bind(this)} style={this.state.pressed ? styles.buttonPressed : styles.button}>
                    <Text>{this.state.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        padding: 10,
        backgroundColor: '#D3D3D3',
        borderRadius: 20,
        width: 60,
        alignItems: 'center'
    },
    buttonPressed: {
        margin: 10,
        padding: 10,
        backgroundColor: '#7e7e7e',
        borderRadius: 20,
        width: 60, 
        alignItems: 'center',
    }
})