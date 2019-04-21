import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated
} from 'react-native';
import Clock from './Clock'
import CustomClock from './CustomClock'
import { WebBrowser } from 'expo';

export default class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeCount: 10,
            questions: [
                //"Reflect on why this project is important to you?",
                "Reflect on why this project is important to you?",
                "Think about the smallest next step you can towards his project",
                "Whats the worst that could happen?"
            ],
            transionCount: 0,
            transitions: [
                ['rgb(198,188,226)', 'rgb(198, 240, 247)'],
                ['rgb(198,188,226)', 'rgb(198, 240, 247)'],
                ['rgb(198, 240, 247)', 'rgb(250, 224, 218)'],
                // ['rgb(250, 224, 218)', 'rgb(198,188,226)']
            ]
        };
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
       // this.reset()
        this.beginCountDown()
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    reset() {
        this.setState({
            resetCount: 1,
            timeCount: 1,
        })
        clearInterval(this.myInterval)
    }

    beginCountDown = () => {
        this.myInterval = setInterval(() => {
            if (this.state.timeCount > 0) {
                this.setState(prevState => ({
                    timeCount: prevState.timeCount - 1
                }))
            } else {
                clearInterval(this.myInterval)
                this.setState({timeCount : 10})
            }
        }, 1000)
    }

    beginTransition = () => {

        if (this.state.transionCount == this.state.transitions.length - 1) {
            //this.props.unmountMe();
           // this.reset()
            this.props.navigation.goBack()
        } else {
            this.beginCountDown()
            this.setState({ transionCount: this.state.transionCount + 1 })
            Animated.timing(this.animatedValue, {
                toValue: 150,
                duration: 100
            }).start();
        }
    }



    render() {
        const interpolateColor = this.animatedValue.interpolate({
            inputRange: [0, 150],
            outputRange: this.state.transitions[this.state.transionCount]
        })
        const animatedStyle = {
            backgroundColor: interpolateColor,
        }
        return (
            <Animated.View style={[styles.container, animatedStyle]}>
                {/* <Clock hasButton = {false} startCount = {60} clockUpMethod = {this.changeColor()}/> */}

                <Text>
                    {this.state.timeCount}
                </Text>

                <Text>{this.state.questions[this.state.transionCount]}</Text>
                <TouchableOpacity onPress={this.beginTransition} style={{ backgroundColor: "white", padding: 20, borderRadius: 5 }}>
                    <Text> Change Color</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: 100,
        height: 100,
    }
});
//}