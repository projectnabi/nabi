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

    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        this.colorValue = new Animated.Value(0);
        this.fadeValue = new Animated.Value(0)
    }

    componentDidMount() {
       // this.reset()
        this.beginCountDown()
        this.beginFade()
    }

    componentWillUnmount() {
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
            this.props.navigation.goBack()
        } else {
            //this.beginCountDown()
            this.colorValue = new Animated.Value(0);
            this.fadeValue = new Animated.Value(0);
            this.setState({ transionCount: this.state.transionCount + 1})
            //this.beginFade()

            Animated.parallel([
                Animated.timing(this.colorValue, {
                    toValue: 150,
                    duration: 1500
                }),
                Animated.timing(this.fadeValue, {
                    toValue: 1,
                    duration: 2000
                })
            ]).start();
        }
    }

    beginFade = () => {
        Animated.timing(this.fadeValue, {
            toValue: 1,
            duration: 2000
        }).start();
    }

    render() {
        // const interpolateFade = this.fadeValue.interpolate({
        //     toValue: 1,
        //     duration: 1000
        // })

        const interpolateColor = this.colorValue.interpolate({
            inputRange: [0, 150],
            outputRange: this.state.transitions[this.state.transionCount]
        })
        const animatedStyle = {
            backgroundColor: interpolateColor,
        }
        return (
            <Animated.View style={[styles.container, animatedStyle]}>
                {/* <Clock hasButton = {false} startCount = {60} clockUpMethod = {this.changeColor()}/> */}

                <Animated.Text style = {[styles.question, {opacity : this.fadeValue}]}>{this.state.questions[this.state.transionCount]}</Animated.Text>
                <TouchableOpacity onPress={this.beginTransition} style={{ backgroundColor: "white", padding: 10, borderRadius: 5, marginTop : 20 }}>
                    <Text>Next Question</Text>
                </TouchableOpacity>
                <Animated.Text style = {[styles.timeText, {opacity : this.fadeValue}]}>
                    {this.state.timeCount}
                </Animated.Text>
            </Animated.View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30,
    },
    question: {
        fontSize : 40,
        fontWeight: "300",
        textAlign: 'center'
    },
    timeText : {
        position : 'absolute',
        bottom: 80,
        justifyContent : 'flex-end',
        fontSize : 70,
        fontWeight: "300",
        textAlign: 'center'
    }
});
//}