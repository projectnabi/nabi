import React from "react";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            clicked: false,
            time: "2:00",
            countUp: false
        };
    };

    componentDidMount() {
        const { startCount } = this.props
        this.setState({
            count: startCount
        })
        // this.beginCountDown()
    }

    beginCountDown = () => {
        this.setState({ clicked: !this.state.clicked })
        if (!this.state.clicked) {
            this.myInterval = setInterval(() => {
                if (this.state.countUp == false) {
                    this.setState(prevState => ({
                        count: prevState.count - 1
                    }))
                    if (this.state.count == 0) {
                        this.setState({ countUp: true })
                    }
                } else {
                    this.setState(prevState => ({
                        count: prevState.count + 1
                    }))
                }

                this.setState({ time: Math.floor(this.state.count / 60) + ":" + this.state.count % 60 })
            }, 1000)
        } else {
            // this.setState({clicked: true})
            clearInterval(this.myInterval)
        }

    }





    render() {
        return (
            <View style >
                <Text style={this.state.countUp ? styles.downText : styles.upText} >{this.state.time} </Text>
                <TouchableOpacity onPress={() => this.beginCountDown()}
                    style={this.state.clicked ? styles.startButton : styles.sto}>
                    <Text style={!this.state.clicked ? styles.startButton : styles.stopButton}> {!this.state.clicked ? "Start" : "Stop"}  </Text>
                </TouchableOpacity>
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
        textAlign: 'center',
        margin: 15,
        height: 40,
        width: 200,
        borderRadius: 5,
        color: 'white'
    },
    stopButton: {
        backgroundColor: "#f4c9c7",
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 15,
        height: 40,
        width: 200,
        borderRadius: 5,
        color: 'white'
    },
    submitButtonText: {
        fontWeight: 'bold',
        color: 'white'
    },
    upText: {
        color: '#f4c9c7',
        fontSize: 56,
        alignItems: 'center',
        textAlign: 'center'
    },
    downText: {
        color: '#ceeeb0',
        fontSize: 56,
        alignItems: 'center',
        textAlign: 'center'
    },
    text: {
        color: 'black',
        fontSize: 56,
        alignItems: 'center',
        textAlign: 'center'

    },
    clockText: {
        color: '#f4c9c7',
        fontSize: 56,
        alignItems: 'center',
        textAlign: 'center'

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
})