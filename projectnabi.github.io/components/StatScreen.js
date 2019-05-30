import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import * as Progress from 'react-native-progress';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts'

import { connect } from 'react-redux'
import images from '../assets/imgmap'
import moment from 'moment'

import { Calendar } from 'react-native-calendars';

// This component renders the stats screen, displaying the specific statits on the users specific project
class StatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectData: this.props.projectData,
        };
    }

    // Removes App Bar
    static navigationOptions = {
        header: null
    }

    // When the component is mounted it stores & fetches the project data
    componentWillMount() {
        //this.setState({ projectData: projectData.projectList[this.props.projectID] })
        this.transformDates()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.projectData) {
            this.setState({ projectData: nextProps.projectData }, this.transformDates)
        }
    }

    transformDates() {
        let dates = this.state.projectData.markedDates
        let calendarDates = {}
        for (const date in dates) {
            let value = dates[date]
            if (value > 0) {
                calendarDates[date] = { selected: true, color: '#8ee1ef' }

                let prevDay = moment(date, "YYYY-MM-DD").local().subtract(1, 'd').format("YYYY-MM-DD").toString()
                calendarDates[date].startingDay = !dates[prevDay]

                let nextDay = moment(date, "YYYY-MM-DD").local().add(1, 'd').format("YYYY-MM-DD").toString()
                calendarDates[date].endingDay = !dates[nextDay]
            }
        }

        this.setState({ calendarDates })
    }

    render() {
        const fill = '#AFF2F9'
        const data = [2, 1, 2, 5, 3, 2, 4, 3]
        const contentInset = { top: 5, bottom: 5 }
        return (
            <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, paddingTop: 50, }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 0, paddingTop: 0 }}>
                    <View style={{ borderRadius: 50, borderColor: "#AFF2F9", marginTop: 0, backgroundColor: "white", borderWidth: 3, alignSelf: "flex-end", padding: 5 }}>
                        <Image style={{ width: 80, height: 80, resizeMode: 'contain' }} source={images[this.state.projectData.img]} />
                    </View>
                    <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                        <View>
                            <Text style={styles.title}>{this.state.projectData.title}</Text>
                            <Text style={styles.amount}>{this.state.projectData.amount}</Text>
                            <Progress.Bar style={{ alignSelf: 'stretch', marginTop: 10 }} progress={0.6} width={200} height={20} color='#AFF2F9' unfilledColor='#f2f2f4' />

                        </View>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    <View style={styles.streakContainer}>
                        <Text style={styles.streakNumber}>{this.state.projectData.currentStreak || 0}</Text>
                        <Text style={styles.streakText}>CURRENT STREAK</Text>
                    </View>
                    <View style={styles.streakContainer}>
                        <Text style={styles.streakNumber}>{this.state.projectData.bestStreak || 0}</Text>
                        <Text style={styles.streakText}>BEST STREAK</Text>
                    </View>
                    <View style={styles.streakContainer}>
                        <Text style={styles.streakNumber}>{this.state.projectData.completions || 0}</Text>
                        <Text style={styles.streakText}>COMPLETIONS</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={{ height: 100, flexDirection: 'row' }}>
                    <YAxis
                        data={data}
                        contentInset={contentInset}
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                        numberOfTicks={5} />
                    <BarChart
                        style={{ flex: 1, margin: 0 }}
                        data={data}
                        svg={{ fill }}
                        contentInset={contentInset}>
                        <Grid belowChart={true} />
                    </BarChart>
                </View>
                <View style={styles.divider} />
                <Calendar
                    markingType={'period'}
                    markedDates={this.state.calendarDates}>
                </Calendar>
            </View>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    projectData: state.projectList[ownProps.projectID]
})

StatScreen = connect(mapStateToProps)(StatScreen)
export default StatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        marginTop: 70
    },
    title: {
        fontSize: 25,
        fontWeight: "300"
    },
    amount: {
        fontSize: 15,
        color: "grey",
        fontWeight: "200"
    },
    divider: {
        height: 2,
        backgroundColor: "#e1e8ee",
        margin: 18,
    },
    streakContainer: {
        alignItems: "center"
    },
    streakNumber: {
        fontWeight: "bold",
        fontSize: 30
    },
    streakText: {
        fontWeight: "200",
        fontSize: 10
    },
    menu: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        top: 10,
        left: 10,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 100,
    },
});

