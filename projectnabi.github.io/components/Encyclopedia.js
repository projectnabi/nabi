

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
import images from '../assets/encyclopediaMap'

import { connect } from 'react-redux'
import Swiper from 'react-native-swiper';

// This component renders a project card component that display preview of the project, which will rendered in a list view
export default class Encyclopedia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            page1: {},
            page2: {},
            page3: {},
            page4: {}
        }
    }

    componentWillMount() {
        this.setState({
            page1: images["page1"],
            page2: images["page2"],
            page3: images["page3"],
            page4: images["page4"]
        })
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.nav} >
                    <Ionicons name="ios-menu" size={32} color="black" onPress={() => this.props.navigation.openDrawer()} />
                </View>
                <Text style={styles.title}>Birddex</Text>

                <Swiper loop={false} activeDotColor='#AFF2F9'>
                    <EncyclopediaPage pageList={this.state.page1} />
                    <EncyclopediaPage pageList={this.state.page2} />
                    <EncyclopediaPage pageList={this.state.page3} />
                    <EncyclopediaPage pageList={this.state.page4} />
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