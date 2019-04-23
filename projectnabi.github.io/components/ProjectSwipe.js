import React, { Component } from 'react';

import { Ionicons} from '@expo/vector-icons';
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import Swiper from 'react-native-swiper';
import ProjectScreen from './ProjectScreen';
import StatScreen from './StatScreen'

// This component enables vertical swiping, allowing the user to swipe
// between the Project Screen and the Stat screen.
export default class ProjectSwipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectID: null,
        }
        
    }

    // Removes App Bar
    static navigationOptions = {
        header: null
    }

    // Fetches Project Data and Stores it in 
    componentWillMount() {
        this.setState({ projectID: this.props.navigation.state.params.projectID })
    }

    // Navigates back to the Home Screen
    goBack = () => {
        const { navigate } = this.props.navigation
        navigate('Home')
    }

    render() {

        const arrowDown = <Ionicons name="ios-arrow-down" size={50} color="black" />
        const arrowUp = <Ionicons name="ios-arrow-up" size={50} color="black" />
        const buttonStyle = { backgroundColor: 'transparent', flexDirection: 'column', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }

        return (

            <Swiper style={styles.wrapper}
                showsButtons={true}
                loop={false}
                horizontal={false}
                showsPagination={false}
                buttonWrapperStyle={buttonStyle}
                nextButton={arrowDown}
                prevButton={arrowUp} >
                <View style={{ flex: 1 }}>
                    <ProjectScreen projectID={this.state.projectID} parentMethod={this.goBack} />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('CBT')}
                        style={styles.help}>
                        <Ionicons name="ios-egg" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <StatScreen projectID={this.state.projectID} />
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
        bottom: 10,
        left: 10,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 100,
    }
})