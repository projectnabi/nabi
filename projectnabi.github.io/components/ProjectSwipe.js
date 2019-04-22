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
import StatScreen from './StatScreen'

export default class ProjectSwipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [1, 2, 3, 4]
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
                horizontal={false}
                showsPagination={false}
                buttonWrapperStyle={{ backgroundColor: 'transparent', flexDirection: 'column', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}
                nextButton={<Ionicons name="ios-arrow-down" size={50} color="black" />}
                prevButton={<Ionicons name="ios-arrow-up" size={50} color="black" />}
            >

                <View style = {{flex : 1}}>
                    <ProjectScreen number={this.props.navigation.state.params.projectID} parentMethod={this.someMethod} />
                    <TouchableOpacity
                onPress= { () => this.props.navigation.navigate('CBT')}
                    style={styles.help}>
                    <Ionicons name="ios-egg" size={24} color="black" />
                </TouchableOpacity>
                </View>
                <View style = {{flex : 1}}>
                    <StatScreen number={this.props.navigation.state.params.projectID} />
                </View>
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