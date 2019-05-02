import React, { Component} from 'react';
import {Button, View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import Date from './Date';

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false
        }
    }
    componentWillMount() {

    }

    changeButton() {
        this.setState({pressed: !this.state.pressed})
    }

    render() {
        return (
            <View style={styles.dates}>
                <Date title="S" />
                <Date title="M" />
                <Date title="T" />
                <Date title="W" />
                <Date title="Th" />
                <Date title="F" />
                <Date title="S" />               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dates: {
        flexDirection: 'row',
        alignItems: 'stretch'
    },
})

