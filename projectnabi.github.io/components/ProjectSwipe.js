import React, { Component } from 'react';

import { Ionicons } from '@expo/vector-icons';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    SafeAreaView
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

        const arrowDown = <Ionicons name="ios-arrow-down" size={50} color="black" style={styles.buttonUp} />
        const arrowUp = <Ionicons name="ios-arrow-up" size={50} color="black" />
        const buttonStyle = { backgroundColor: 'transparent', flexDirection: 'column', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }

        return (

            <Swiper style={styles.wrapper}
                showsButtons={true}
                loop={false}
                horizontal={false}
                showsPagination={false}
                buttonWrapperStyle={buttonStyle}
                nextButton={arrowUp}
                prevButton={arrowDown} >
                <View style={{ flex: 1 }}>
                    <ProjectScreen projectID={this.state.projectID} parentMethod={this.goBack} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CBT')} style={styles.help}>
                        <Ionicons name="ios-help-buoy" size={30} color="black"  />
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
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    help: {
        position: 'absolute',
        bottom: 30,
        left: 30,
    },
    buttonUp: {
        marginTop: 10
    }
})