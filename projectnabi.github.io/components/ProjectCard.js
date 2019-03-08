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

export default class Project extends Component {
    componentWillMount() {
        this.setState({ color: this.props.color })
    }

    render() {

        return (
            <View style={{ borderRadius: 5, backgroundColor: this.props.color, flex: 1, margin: 15, alignItems: 'center', justifyContent : "center", height: 250,shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2 }}>
                <Text style={{ color: "#000", zIndex: 100 }}>{this.state.color}</Text>
            </View>
        );
    }
}

// width: this.props.width, height: this.props.height
