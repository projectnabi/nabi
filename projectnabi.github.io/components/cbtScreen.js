import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Animated,
    View
} from 'react-native';

// This component renders the CBT (Cognitive Behavioral Therapy) Screen, display a UI that incorporates CBT methods to help the user get back on track
export default class CBT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeCount: 60,
            questions: [
                //"Reflect on why this project is important to you?",
                "Reflect on why this project is important to you",
                "What is the most likely scenario and how likely is it to happen?",
                "What is the best case scenario right now?",
                "What can you do to make the best case scenario happen?",
                "Think of the smallest step you can take towards this project",
            ],
            transionCount: 0,
            transitions: [
                ['rgb(198,188,226)', 'rgb(198, 240, 247)'],
                ['rgb(198,188,226)', 'rgb(198, 240, 247)'],
                ['rgb(198, 240, 247)', 'rgb(250, 224, 218)'],
                ['rgb(250, 224, 218)', 'rgb(198, 240, 247)'],
                ['rgb(198, 240, 247)', 'rgb(198,188,226)'],
            ]
        };
    }

        
    // Removes App Bar
    static navigationOptions = {
        header: null,

    }
    // When the component will all animated variables are set to 0
    componentWillMount() {
        this.colorValue = new Animated.Value(0);
        this.fadeValue = new Animated.Value(0)
    }

    // When the component has mounted it will call the animation functions
    componentDidMount() {
        this.beginCountDown()
        this.beginFade()
    }

    // When the component is unmounted timer is cleared
    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    // A function that initiates a clock that counts down
    beginCountDown = () => {
        this.myInterval = setInterval(() => {
            if (this.state.timeCount > 0) {
                this.setState(prevState => ({
                    timeCount: prevState.timeCount - 1
                }))
            } else {
                clearInterval(this.myInterval)
                this.setState({ timeCount: "" })
            }
        }, 1000)
    }

    // This function executes all of the transitions animation functions when the timer counts all the way down to 0. If it is the last transition it will return to the project view screen
    beginTransition = () => {
        if (this.state.transionCount == this.state.transitions.length - 1) {
            this.props.navigation.goBack()
        } else {
            this.colorValue = new Animated.Value(0);
            this.fadeValue = new Animated.Value(0);
            this.setState({ transionCount: this.state.transionCount + 1, timeCount: 60 })
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

    // This function executes the fading animation which is applied on the Text
    beginFade = () => {
        Animated.timing(this.fadeValue, {
            toValue: 1,
            duration: 2000
        }).start();
    }

    render() {
        const interpolateColor = this.colorValue.interpolate({
            inputRange: [0, 150],
            outputRange: this.state.transitions[this.state.transionCount]
        })

        const animatedStyle = {
            backgroundColor: interpolateColor,
        }

        return (
            <Animated.View style={[styles.container, animatedStyle]}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.back}>
                    <Ionicons name="ios-arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Animated.Text style={[styles.question, { opacity: this.fadeValue }]}>{this.state.questions[this.state.transionCount]}</Animated.Text>
                {/* The Button is Temporary*/}
                <TouchableOpacity onPress={this.beginTransition} style={{ backgroundColor: "white", padding: 10, borderRadius: 5, marginTop: 20 }}>
                    <Text>Next Question</Text>
                </TouchableOpacity>
                <Animated.Text style={[styles.timeText, { opacity: this.fadeValue }]}>
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
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30,
    },
    question: {
        fontSize: 40,
        fontWeight: "300",
        textAlign: 'center'
    },
    timeText: {
        position: 'absolute',
        bottom: 80,
        justifyContent: 'flex-end',
        fontSize: 70,
        fontWeight: "300",
        textAlign: 'center'
    },
    back: {
        position: 'absolute',
        top: 30,
        left: 30,
    }
});