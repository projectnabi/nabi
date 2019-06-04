import React, { Component } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
    Image,
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native';

export default class EncyclopediaBird extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jump: new Animated.Value(0),
            flipped: false,
            item: this.props.item
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.item) {
            this.setState({ item: nextProps.item })
        }
    }

    birdJump() {
        this.setState({ flipped: !this.state.flipped }, () => {
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
            ]).start()
        })
    }

    render() {
        let item = this.state.item
        return (
            <Animated.View style={{
                transform: [
                    { translateY: this.state.jump }
                ]
            }}>
                <TouchableOpacity onPress={() => item.unlocked ? this.birdJump() : null} activeOpacity={0.6}>
                    <Image source={item.img} style={{
                        tintColor: item.unlocked ? undefined : '#C8C8C8',
                        width: 120,
                        height: 120,
                        resizeMode: 'contain',
                        justifyContent: 'center',
                        transform: [
                            { scaleX: this.state.flipped ? -1 : 1 }
                        ]
                    }}></Image>
                    {item.unlocked ? undefined : <FontAwesome style={{ position: 'absolute', left: '40%', top: '25%' }} color="#FFFFFF" name="lock" size={30} />}
                </TouchableOpacity>
            </Animated.View>
        );
    }
}