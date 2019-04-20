
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
        };
    };

    componentDidMount() {
        const { startCount } = this.props
        this.setState({
            count: startCount
        })
        this.beginCountDown()
    }

    beginCountDown = () => {
        this.myInterval = setInterval(() => {
            if (this.state.count > 0) {
            this.setState(prevState => ({
                count: prevState.count - 1
            }))
        } else {
            clearInterval(this.myInterval)
        }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }



    render() {
        return (
            <Text>
                {this.state.count} 
            </Text>
        );
    }
}