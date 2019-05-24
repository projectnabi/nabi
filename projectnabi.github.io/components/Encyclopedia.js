

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


// This component renders a project card component that display preview of the project, which will rendered in a list view
export default class Encyclopedia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            encyclopediaList: [{ img: require("../assets/bird1.png"), unlocked: true }, { img: require("../assets/bird2.png"), unlocked: true }, { img: require("../assets/bird2.png"), unlocked: false }, { img: require("../assets/bird2.png"), unlocked: false }, { img: require("../assets/bird1.png"), unlocked: false }, { img: require("../assets/bird2.png"), unlocked: false }, { img: require("../assets/bird1.png"), unlocked: false }, { img: require("../assets/bird2.png"), unlocked: false }, { img: require("../assets/bird2.png"), unlocked: false }]
        }
    }

    static navigationOptions = {
        // header: null,
         drawerIcon : 
           <Ionicons name="ios-journal" size={30} />
       }

    _keyExtractor = (item, index) => index

    _renderItem = ({ item }) => {
        return (
            <View style={{ marginTop: 50 }}>
                <View style={{ justifyContent: 'center', padding: 5, opacity : .5}}>
                    <Image source={item.img} style={{ tintColor: item.unlocked ? 'none' : 'black', width: 120, height: 120, resizeMode: 'contain', justifyContent: 'center' }}></Image>
                    <Text style={{ position: 'absolute', left: '50%', color: "#FFFFFF", fontSize: '32px' }}>
                        {item.unlocked ? '' : '?'}
                    </Text>
                </View>
                <Text style={{ alignSelf: 'center' }}> Bird Name </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>

                {/* <ScrollView contentContainerStyle={styles.container} > */}
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={this.state.encyclopediaList}
                    numColumns={3}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
                <Ionicons name="ios-menu" size={30} color="black" style={styles.menu} onPress={() => this.props.navigation.openDrawer()} />
                {/* </ScrollView> */}
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
    menu: {
        position: 'absolute',
        top: 40,
        left: 30,
    },
    listContainer: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});