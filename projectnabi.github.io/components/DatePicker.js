import React, { Component} from 'react';
import {View, StyleSheet} from 'react-native'
import Day from './Day';

 
export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // gets the dates the user wants to do project andd puts it into state
    // getDates() {
    //     let dates = []  
    //     React.Children.forEach(this.props.children, child => {
    //         console.log(child)
    //     })
    //     console.log(dates)
    //     this.setState({dates, dates})
    // } 

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

