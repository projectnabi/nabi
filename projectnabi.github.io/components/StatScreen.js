import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Image, TouchableOpacity, TouchableHighlight, Button } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import projectData from '../Data/projectData';
import { createDrawerNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'

import { Calendar } from 'react-native-calendars';

export default class StatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectData: null,
        };
    }

    static navigationOptions = {
        header: null
    }


    componentWillMount() {
        this.setState({ projectData: projectData.projectList[this.props.navigation.state.params.projectID] })
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 20 }}>

                <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                    style={{ alignItems: "center" }} >
                    <Ionicons name="ios-arrow-up" size={50} color="black" />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ borderRadius: 50, borderColor: "#AFF2F9", backgroundColor: "white", borderWidth: 3, padding: 5 }}>
                        <Image style={{ width: 80, height: 80, resizeMode: 'contain' }} source={this.state.projectData.img} />
                    </View>
                    <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                        <View>
                            <Text style = {styles.title}>{this.state.projectData.title}</Text>
                            <Text style = {styles.amount}>{this.state.projectData.amount}</Text>
                            <Text>Progress Bar</Text>
                        </View>
                    </View>
                </View>
                <Calendar></Calendar>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        marginTop: 70
        // marginVertical: 20,
    },
    title : {
        fontSize: 40,
        fontWeight: "300"
    },
    amount : {
        fontSize: 20,
        color: "grey",
        fontWeight: "200"
    },
    floatingButton: {
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
    },
    menu: {
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
        left: 10,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 100,
    }
});

