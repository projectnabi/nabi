import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    Animated,
    Easing,
    TouchableOpacity,
} from 'react-native';

import images from '../assets/imgmap'

// This component renders a project card component that display preview of the project, which will rendered in a list view
export default class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jump: new Animated.Value(0),
            xPos: new Animated.Value(0),
            xOffset: 0,
            flipped: false
        }
    }

    // When component mounts fetches and stores title and image
    componentWillMount() {
        this.setState({
            project: this.props.project,
            totalTime: Object.values(this.props.project.markedDates).reduce((prev, cur) => prev + cur)
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            project: nextProps.project,
            totalTime: Object.values(nextProps.project.markedDates).reduce((prev, cur) => prev + cur)
        })
    }

    birdJump() {
        let newX = (Math.random() - 0.5) * 40
        this.setState({ xOffset: newX, flipped: newX - this.state.xOffset > 0 }, () => {
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(
                        this.state.jump,
                        {
                            toValue: -(Math.random() * 10 + 15),
                            duration: 200,
                            easing: Easing.out(Easing.quad),
                        }
                    ),
                    Animated.timing(
                        this.state.jump,
                        {
                            toValue: 0,
                            duration: 200,
                            easing: Easing.in(Easing.quad),
                        }
                    )
                ]),
                Animated.timing(
                    this.state.xPos,
                    {
                        toValue: newX,
                        duration: 400,
                        easing: Easing.linear
                    }
                )
            ]).start()
        })
    }

    render() {
        return (
            <View style={{ backgroundColor: "#FFFFFF", margin: 5, alignItems: 'center', justifyContent: "space-evenly", height: 150, flexDirection: 'row' }}>
                <View style={{ justifyContent: "center" }}>
                    <Animated.View style={{
                        transform: [
                            { translateY: this.state.jump },
                            { translateX: this.state.xPos }
                        ]
                    }}>
                        <TouchableOpacity onPress={() => this.birdJump()} activeOpacity={0.6}>
                            <Image style={{
                                width: 120, height: 120, resizeMode: 'contain', transform: [
                                    { scaleX: this.state.flipped ? -1 : 1 }
                                ]
                            }} source={images[this.state.project.img]} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                <View style={{ margin: 5 }}>
                    <Text style={{ color: "gray", textAlign: 'right', fontSize: 20 }}>{this.state.project.title}</Text>
                    <Text style={{ color: "gray", textAlign: 'right', fontSize: 16 }}>{'Best Streak'}</Text>
                    <Text style={{ color: "gray", textAlign: 'right', fontSize: 16 }}>{'Completions'}</Text>
                    <Text style={{ color: "gray", textAlign: 'right', fontSize: 16 }}>{'Time Spent'}</Text>
                </View>
                <View>
                    <Text style={{ color: "black", fontSize: 20 }}>{this.state.project.name}</Text>
                    <Text style={{ color: "black", fontSize: 16 }}>{this.state.project.bestStreak}</Text>
                    <Text style={{ color: "black", fontSize: 16 }}>{this.state.project.completions}</Text>
                    <Text style={{ color: "black", fontSize: 16 }}>{this.state.totalTime + 's'}</Text>
                </View>
            </View>
        );
    }
}