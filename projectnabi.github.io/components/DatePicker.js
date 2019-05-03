import React, { Component} from 'react';
import {View, StyleSheet} from 'react-native'
import Date from './Date';

// 
export default class DatePicker extends Component {
    getDates() {

    } 

    render() {
        return (
            <View ref="datePicker" style={styles.dates}>
                <Date title="Mon" />
                <Date title="Tue" />
                <Date title="Wed" />
                <Date title="Th" />
                <Date title="Fri" />
                <Date title="Sat" />  
                <Date title="Sun" />             
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

