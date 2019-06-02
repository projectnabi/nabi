

import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    Image,
    Text,
    View,
    FlatList,
    ScrollView,
    StyleSheet,
} from 'react-native';

import EncyclopediaPage from './EncylopediaPage'
import images from '../assets/imgmap'

import { connect } from 'react-redux'
import Swiper from 'react-native-swiper';

// This component renders a project card component that display preview of the project, which will rendered in a list view
class Encyclopedia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foundBirds: this.props.foundBirds,
            page1: [],
            page2: [],
            page3: [],
            page4: []
        }
    }

    componentWillMount() {
        this._writePage()
    }

    static navigationOptions = {
        // header: null,
        drawerIcon:
            <Ionicons name="ios-journal" size={30} />
    }

    _keyExtractor = (item, index) => index

    _renderItem = ({ item }) => {
        return (
            <View>
                <View style={{ justifyContent: 'center', padding: 5, opacity: .5 }}>
                    <Image source={item.img} style={{ tintColor: item.unlocked ? 'none' : 'black', width: 120, height: 120, resizeMode: 'contain', justifyContent: 'center', paddingBottom: 20 }}></Image>
                    <Text style={{ position: 'absolute', left: '50%', color: "#FFFFFF", fontSize: 32 }}>
                        {item.unlocked ? '' : '?'}
                    </Text>
                </View>
                <Text style={{ alignSelf: 'center' }}> Bird Name </Text>
            </View>
        )
    }

    //iterate throug found birds and compare to imgMap
    _writePage = () => {
        this.state.foundBirds.forEach(bird => {
            birdImage = images[bird]
            console.log(birdImage)
            if (bird.startsWith("bird1")) {
                this.state.page1.push(birdImage)
            } else if (bird.startsWith("bird2")) {
                this.state.page2.push(birdImage)
            } else if (bird.startsWith("bird3")) {
                this.state.page3.push(birdImage)
            } else {
                this.state.page4.push(birdImage)
            }
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.nav} >
                    <Ionicons name="ios-menu" size={32} color="black" onPress={() => this.props.navigation.openDrawer()} />
                </View>
                <Text style={styles.title}>Encyclopedia</Text>

                <Swiper loop={false} activeDotColor='#AFF2F9'>
                    <EncyclopediaPage pageList={this.state.page1} />
                    <EncyclopediaPage pageList={this.state.page2} />
                    <EncyclopediaPage pageList={this.state.page3} />
                    <EncyclopediaPage pageList={this.state.page4} />
                    {/* <Text>{this.state.foundBirds}</Text> */}
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center'
    },
    listContainer: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nav: {
        padding: 30,
        paddingBottom: 0,
    },
    title: {
        fontSize: 40,
        textAlign: 'center'
    }
});

const mapStateToProps = state => ({
    foundBirds: state.user.foundBirds,
})

Encyclopedia = connect(mapStateToProps)(Encyclopedia)

export default Encyclopedia