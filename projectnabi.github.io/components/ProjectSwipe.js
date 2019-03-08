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
import Swiper from 'react-native-swiper';
import { WebBrowser } from 'expo';
import projectData from '../Data/projectData';
import ProjectView from './ProjectView'

export default class ProjectSwipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: []
        };
    }

    static navigationOptions = {
        title: 'Project',
    };

    componentWillMount() {
        this.setState({ arr: projectData.projectList })
    }

    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
            {this.state.arr.map((num, i) => 
                <ProjectView key = {i} color = {num.color}/>
                /* <View style={styles.slide3} key = {i}>
                    <Text style={styles.text}>{num.color}</Text>
                </View> */
            )}
          {/* </View> */}
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