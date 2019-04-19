import React, { Component } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import projectData from '../Data/projectData';
import ProjectScreen from './ProjectScreen';
import StateScreen from './StatScreen'

export default class ProjectSwipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [1,2,3,4]
        };
    }

    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        this.setState({ projectData: projectData.projectList[this.props.navigation.state.params.projectID] })
    }

    someMethod = () => {
        const { navigate } = this.props.navigation
        navigate('Home')
    }

    render() {
        return (

        <Swiper style={styles.wrapper} 
        showsButtons={true} 
        loop={false}
        horizontal = {false} 
        showsPagination = {false} 
        buttonWrapperStyle = {{backgroundColor: 'transparent', flexDirection: 'column', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between',alignItems: 'center'}}
        nextButton = { <Ionicons name="ios-arrow-down" size={50} color="black" />}
        prevButton = {<Ionicons name="ios-arrow-up" size={50} color="black" />}
        >

        <ProjectScreen number = {this.props.navigation.state.params.projectID} parentMethod={this.someMethod}/>
        <StateScreen number = {this.props.navigation.state.params.projectID}/>
      </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})