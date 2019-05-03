import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { connect } from 'react-redux'
import { setTime, markDone, incrStreak, hatch } from '../store/actions'
import moment from 'moment'

// The component Renders a clock that takes in a startCount as a prop
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectData: this.props.projectData,
            startCount: 60,
            clicked: false,
            time: "00:02:00",
            countUp: false,
        };
    };

    // when the clock starts counting up it will call the parent method that is passed as a prop
    countUpdate = () => {
        this.props.updateMethod();
        this.props.dispatch(setTime(this.props.projectID, this.state.date, this.state.countUp ? this.state.startCount : 0))
    }

    // when the clock starts counting up it will call the parent method that is passed as a prop
    clockUp = () => {
        this.props.clockUpMethod();
    }

    // When the component has mounted it will fetch the props and store them in the state
    componentDidMount() {
        let dtStr = moment(new Date()).format("YYYY-MM-DD")
        
        const { startCount } = this.props
        this.setState({
            startCount: startCount,
            date: dtStr
        })
    }

    // The function renders a clock and button that counts all the way down, then starts counting up until the user cancels the clock
    beginCountDown = () => {
        this.setState({ clicked: !this.state.clicked })
        if (!this.state.clicked) {
            this.myInterval = setInterval(() => {
                if (this.state.countUp == false) {
                    this.setState(prevState => ({
                        startCount: prevState.startCount - 1
                    }))
                    if (this.state.startCount <= 0) {
                        this.setState({ countUp: true })
                        if (!this.state.projectData.completedToday) {
                            this.props.dispatch(incrStreak(this.props.projectID))
                            this.props.dispatch(markDone(this.props.projectID))
                        }

                    }
                } else {
                    this.clockUp()
                    this.setState(prevState => ({
                        startCount: prevState.startCount + 1
                    }))
                }
                this.countUpdate()
                this.setState({ time: this.timeToString(this.state.startCount * 1000) })
            }, 1000)
        } else {
            // this.setState({clicked: true})
            clearInterval(this.myInterval)

            if (this.state.projectData.img === 'egg') {
                this.props.dispatch(hatch(this.props.projectID))
            }
        }
    }

    // converts the time intp a human readable form
    timeToString(ms) {
        return new Date(ms).toISOString().slice(11, 19);
    }

    render() {
        return (
            <View >
                <Text style={this.state.countUp ? styles.downText : styles.upText} >{this.state.time} </Text>
                <TouchableOpacity disabled={this.state.clicked && !this.state.countUp} onPress={() => this.beginCountDown()}
                    // style={this.state.clicked ? styles.startButton : styles.stopButton}
                    style={{ alignItems: "center" }}>
                    <Text style={!this.state.clicked ? styles.startButton
                        :
                        this.state.clicked && !this.state.countUp ?
                            styles.none : styles.stopButton}> {
                            !this.state.clicked ? "Start" : "Cancel"}  </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
  projectData: state.projectList[ownProps.projectID]
})
Clock = connect(mapStateToProps)(Clock)
export default Clock

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
        backgroundColor: "white",
        borderColor: "#e1e8ee",
        borderWidth: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 15,
        height: 40,
        width: 100,
        color: 'black'
    },
    none: {
        backgroundColor: "white",
        borderColor: "white",
        borderWidth: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 15,
        height: 40,
        width: 100,
        color: 'white'
    },
    submitButtonText: {
        fontWeight: 'bold',
        color: 'white'
    },
    upText: {
        color: '#f4c9c7',  //,
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
        color: "black",
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