import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
} from 'react-native';
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
            image: this.props.image
        })
    }

    render() {
        return (
            <View style={{ borderRadius: 5, backgroundColor: "#FFFFFF", flex: 1, margin: 15, alignItems: 'center', justifyContent: "space-evenly", height: 250, }}>
                <Text style={{ color: "black", zIndex: 100, fontSize: 24, fontWeight: "400" }}>{this.props.title}</Text>
                <Text style={{ color: "grey", zIndex: 100 }}>{this.props.name}</Text>
                <Image style={{ width: 120, height: 120, resizeMode: 'contain' }} source={this.state.image} />
                <Text style={{ color: "grey", zIndex: 100 }}>{this.props.amount}</Text>
            </View>
        );
    }
}