
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
            resetCount: 1,
            timeCount: 1,
        };
    };

    componentDidMount() {
        const { startCount } = this.props
        this.setState({
            timeCount: startCount
        })
        this.beginCountDown()
    }

    beginCountDown = () => {
        this.myInterval = setInterval(() => {
            if (this.state.timeCount > 0) {
                this.setState(prevState => ({
                    timeCount: prevState.timeCount - 1
                }))
            } else {
                clearInterval(this.myInterval)
            }
        }, 1000)
    }

    reset() {
        this.setState({
            resetCount: 1,
            timeCount: 1,
        })
        clearInterval(this.myInterval)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }



    render() {
        return (
            <Text>
                {this.state.timeCount}
            </Text>
        );
    }
}