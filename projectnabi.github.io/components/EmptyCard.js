import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
} from 'react-native';

import * as Progress from 'react-native-progress';

import { Ionicons } from '@expo/vector-icons';

// This component renders a project card component that display preview of the project, which will rendered in a list view
export default class Project extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={{  backgroundColor: "#FFFFFF",  margin: 15, marginTop : 50, alignItems: 'center', justifyContent : "center"}}>
                <Image style={{ width: 200, height: 200, resizeMode: 'contain' }} source={require("../assets/emptyEgg.png")} />
                <Text style={{ color: "grey", fontSize : 24 }}> {this.props.msg1} </Text>
                <Text style={{ color: "grey", fontSize : 24 }}> {this.props.msg2}</Text>
            </View>
        );
    }
}