import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Clock from './Clock'

import projectData from '../Data/projectData';

import * as Progress from 'react-native-progress';

import { Ionicons } from '@expo/vector-icons';

// This component renders the project screen, displaying the users bird and functionality for being productive
export default class ProjectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectData: null,
            timeCount: 120,
            progressCount: 0,
            progressFill: 0,
            fullBar: 300, //1800,
            isClockUp: false
        };
    }

    // When the component is mounted it stores & fetches the project data
    componentWillMount() {
        this.setState({ projectData: projectData.projectList[this.props.projectID] })
    }

    // the function calls the parent method which handles navigation
    onClose = () => {
        this.props.parentMethod();
    }

    // is called when clock starts count up
    clockUpUpdate = () => {
        this.setState({ isClockUp: true })
    }

    // This function is called every second to indicate live progress by updating the progress bar.
    updateProgressBar = () => {
        this.setState({ progressCount: this.state.progressCount + 1 })
        this.setState({ progress: this.state.progressCount / this.state.fullBar })
    }

    // Removes App Bar
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.container}>
                <Ionicons name="ios-close" size={40} color="black" style={styles.close}
                    onPress={() => this.onClose()} />
                <Ionicons name="md-more" size={25} color="black" style={styles.more} />
                <Text style={styles.text}>{this.state.projectData.title}</Text>
                <Image style={{ width: 200, height: 200, resizeMode: 'contain', marginTop: 100, marginBottom: 50 }} source={this.state.projectData.img} />
                <Clock hasButton={true} startCount={this.state.timeCount} updateMethod={this.updateProgressBar} clockUpMethod={this.clockUpUpdate}></Clock>
                <Progress.Bar style={{ position: 'absolute', right: -230, marginTop: 10, transform: [{ rotate: '-90deg' }] }} progress={this.state.progressFil} width={500} height={10} color='#ceeeb0' unfilledColor='#f2f2f4' />
            </View>
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
        position: 'absolute',
        top: 30,
        left: 30,
    },
    more: {
        position: 'absolute',
        top: 35,
        right: 30,
    },
})
