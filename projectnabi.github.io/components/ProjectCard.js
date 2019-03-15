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
    constructor(props) {
        super(props);
        this.state = {
          image : null
        };
      }

    componentWillMount() {
        this.setState({ 
            title: this.props.title,
            image: this.props.image
        })
    }

    render() {

        return (
            <View style={{ borderRadius: 5, backgroundColor: "#FFFFFF", flex: 1, margin: 15, alignItems: 'center', justifyContent : "space-evenly", height: 250,}}>
                <Text style={{ color: "black", zIndex: 100, fontSize: 24, fontWeight: "bold" }}>{this.props.title}</Text>
                <Text style={{ color: "grey", zIndex: 100 }}>{this.props.name}</Text>
                <Image style = {{width: 120,height: 120, resizeMode: 'contain'}} source = {this.state.image}/>
                <Text style={{ color: "grey", zIndex: 100 }}>{this.props.amount}</Text>
            </View>
        );
    }
}

// width: this.props.width, height: this.props.height


//SHADOW
// shadowColor: '#000',
// shadowOffset: { width: 0, height: 2 },
// shadowOpacity: 0.5,
// shadowRadius: 2 