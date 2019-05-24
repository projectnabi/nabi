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
        this.state = {
            image: null,
        };
    }

    // When component mounts fetches and stores title and image
    componentWillMount() {
        this.setState({
            title: this.props.title,
            image: this.props.image,
            type: this.props.type
        })
    }

    render() {
        return (
            //flex : 1
            <View style={{  backgroundColor: "#FFFFFF", margin: 5, alignItems: 'center', justifyContent: "space-evenly", height: 250, }}>
                <Text style={{ color: "black", zIndex: 100, fontSize: 24, fontWeight: "400" }}>{this.props.title}</Text>
                <Text style={{ color: "grey", zIndex: 100 }}>{this.props.name}</Text>
                <View style={{ justifyContent: "center" }}>
                    <Image style={{ width: 120, height: 120, resizeMode: 'contain' }} source={this.state.image} />
                    {this.state.type !== "egg" ?
                        <View style={{ justifyContent: "center" }}>
                            <Progress.Circle
                                style={{ position: "absolute", left: 0, bottom: 2 }}
                                progress={.9} size={25} color={"red"} unfilledColor='#ffffff' borderWidth={0} direction="clockwise" thickness={2} endAngle={.50} />
                            {/* <Ionicons name="ios-heart" size={10} color="red" style={{position : "absolute", left : 8, bottom: 8}}/> */}
                            <Ionicons name="ios-heart" size={15} color="red" style={{ position: "absolute", left: 6, bottom: 5 }} />
                        </View>
                        : undefined}
                </View>
                <Text style={{ color: "grey", zIndex: 100 }}>{this.props.amount}</Text>
            </View>
        );
    }
}