import React, { Component} from 'react';
import {View, StyleSheet} from 'react-native'
import Day from './Day';

 
export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        return (
            <View ref="datePicker" style={styles.dates}>
                {this.props.children}           
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dates: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        marginBottom: 20
    },
})

