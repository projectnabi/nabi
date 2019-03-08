import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { WebBrowser } from 'expo';

export default class ProjectView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.slide3}>
                <Text style={styles.text}>{this.props.color}</Text>
                <Text style={styles.text}>2:00</Text>
                <TouchableOpacity
                    style={styles.submitButton}>
                    <Text style={styles.submitButtonText}> START </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: "dodgerblue",
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        height: 40,
        width: 200,
        borderRadius: 5
    },
    submitButtonText: {
        color: 'white'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    }
})
