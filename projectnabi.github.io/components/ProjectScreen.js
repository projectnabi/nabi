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
import Clock from './Clock'

import * as Progress from 'react-native-progress';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default class ProjectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectData: null,
            count: 0,
            progressCount:0,
            progress: 0,
            clicked: false,
            fullBar: 300, //1800,
            isClockUp : false
            
        };
    }

    componentWillMount() {
        // this.setState({ projectData: projectData.projectList[this.props.navigation.state.params.projectID] })

        this.setState({ projectData: projectData.projectList[this.props.number] })
    }

    click = () => {
        this.props.parentMethod();
    }

    clockUpUpdate = () => {
        this.setState({isClockUp : true})
    }

    updateProgressBar = () => {
        this.setState({progressCount : this.state.progressCount + 1})
        this.setState({progress : this.state.progressCount / this.state.fullBar})
    }

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            // <View style ={{flex : 1}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.click()}
                    style={styles.close}>
                    <Ionicons name="ios-close" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.more}>
                    <Ionicons name="md-more" size={24} color="black" />
                </TouchableOpacity>
                
                <Text style={styles.text}>{this.state.projectData.title}</Text>
                <Image style={{ width: 200, height: 200, resizeMode: 'contain', marginTop: 100, marginBottom: 50 }} source={this.state.projectData.img} />
                <Clock hasButton = {true} startCount={120} updateMethod={this.updateProgressBar} clockUpMethod = {this.clockUpUpdate}></Clock>
                <Progress.Bar style={{ position: 'absolute', right: -230, marginTop: 10, transform: [{ rotate: '-90deg'}] }} progress={this.state.progress} width={500} height={10} color='#ceeeb0' unfilledColor='#f2f2f4' />
                
                </View>
                

                
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    startButton: {
        backgroundColor: "#ceeeb0",
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        height: 40,
        width: 200,
        borderRadius: 5
    },
    stopButton: {
        backgroundColor: "#f4c9c7",
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        height: 40,
        width: 200,
        borderRadius: 5
    },
    submitButtonText: {
        fontWeight: 'bold',
        color: 'white'
    },
    text: {
        color: 'black',
        fontSize: 56,
        fontWeight: "300"

    },
    clockText: {
        color: '#f4c9c7',
        fontSize: 56,

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    close: {
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
    },
    help: {
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
        bottom: 10,
        left: 10,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 100,
    }
})
