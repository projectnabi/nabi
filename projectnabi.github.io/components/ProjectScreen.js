import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    Easing
} from 'react-native';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

import Clock from './Clock'

import { connect } from 'react-redux'
import images from '../assets/imgmap'

import * as Progress from 'react-native-progress';

import { Ionicons } from '@expo/vector-icons';

import AddModal from './AddModal';

import { deleteProject } from '../store/actions'

// This component renders the project screen, displaying the users bird and functionality for being productive
class ProjectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectData: this.props.projectData,
            progressCount: 120,
            timeCount: process.env.NODE_ENV === 'development' && 5 || 120,
            progressFill: 0,
            fullBar: 120, //1800,
            isClockUp: false,
            barColor: "#f4c9c7",
            jump: new Animated.Value(0),
            xPos: new Animated.Value(0),
            xOffset: 0,
            flipped: false
        };

        console.log(this.state)
    }

    // When the component is mounted it stores & fetches the project data
    componentWillMount() {
        //this.setState({ projectData: projectData.projectList[this.props.projectID] })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.projectData) {
            this.setState({ projectData: nextProps.projectData })
        }
    }

    // the function calls the parent method which handles navigation
    onClose = () => {
        this.props.parentMethod();
    }

    // is called when clock starts count up
    clockUpUpdate = () => {
        this.setState({
            isClockUp: true,
            fullBar: 300, // 5 mins
            barColor: '#ceeeb0'
        })
    }

    // This function is called every second to indicate live progress by updating the progress bar. If the clock is counting down, the progress bar 
    updateProgressBar = () => {
        let progress
        if (this.state.isClockUp) {
            progress = this.state.progressCount + 1
        } else {
            progress = this.state.progressCount - 1
        }
        this.setState({
            progressCount: progress,
            progressFill: progress / this.state.fullBar
        })
    }

    handleEdit = () => {
        this.refs.addModal.openModal()
    }

    handleDelete = () => {
        this.props.dispatch(deleteProject(this.props.projectData.id))
        this.onClose()
    }

    // Removes App Bar
    static navigationOptions = {
        header: null
    }

    onclick = () => {
        console.log('On click works')
        this.setState({ top: this.state.top + 5 })
    };

    birdJump() {
        let newX = (Math.random() - 0.5) * 100
        this.setState({ xOffset: newX, flipped: newX - this.state.xOffset > 0 }, () => {
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(
                        this.state.jump,
                        {
                            toValue: -(Math.random() * 10 + 15),
                            duration: 200,
                            easing: Easing.out(Easing.quad),
                        }
                    ),
                    Animated.timing(
                        this.state.jump,
                        {
                            toValue: 0,
                            duration: 200,
                            easing: Easing.in(Easing.quad),
                        }
                    )
                ]),
                Animated.timing(
                    this.state.xPos,
                    {
                        toValue: newX,
                        duration: 400,
                        easing: Easing.linear
                    }
                )
            ]).start()
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Ionicons name="ios-close" size={40} color="black" style={styles.close}
                    onPress={() => this.onClose()} />
                <Menu style={styles.more}>
                    <MenuTrigger >
                        <Ionicons name="md-more" size={30} color="black" />
                    </MenuTrigger>
                    <MenuOptions >
                        <MenuOption text='Edit' onSelect={this.handleEdit}></MenuOption>
                        <MenuOption text='Delete' onSelect={this.handleDelete}></MenuOption>
                    </MenuOptions>
                </Menu>
                <Text style={styles.text}>{this.state.projectData.title}</Text>
                <Animated.View style={{
                    transform: [
                        { translateY: this.state.jump },
                        { translateX: this.state.xPos }
                    ]
                }}>
                    <TouchableOpacity onPress={() => this.birdJump()} activeOpacity={0.6}>
                        <Image style={{
                            width: 200, height: 200, resizeMode: 'contain', marginTop: 100, marginBottom: 50,
                            transform: [
                                { scaleX: this.state.flipped ? -1 : 1 }
                            ]
                        }} source={images[this.state.projectData.img]} />
                    </TouchableOpacity>
                </Animated.View>
                <Clock hasButton={true} startCount={this.state.timeCount} updateMethod={this.updateProgressBar} clockUpMethod={this.clockUpUpdate} projectID={this.props.projectID}></Clock>
                <Progress.Bar style={{ position: 'absolute', right: -230, marginTop: 10, transform: [{ rotate: '-90deg' }] }} progress={this.state.progressFill} width={500} height={10} color={this.state.barColor} unfilledColor='#f2f2f4' />
                <AddModal ref={'addModal'} parentFlatList={this} title={this.state.projectData.title} name={this.state.projectData.name} edit={true} >
                </AddModal>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    projectData: state.projectList[ownProps.projectID]
})

ProjectScreen = connect(mapStateToProps)(ProjectScreen)
export default ProjectScreen

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
        fontSize: 48,
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
