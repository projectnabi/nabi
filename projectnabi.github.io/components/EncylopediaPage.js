

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
export default class EncyclopediaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            encyclopediaList : this.props.pageList
        }
    }

    _keyExtractor = (item, index) => index

    _renderItem = ({ item }) => {
        return (
            <View style = {{paddingBottom: 20}}>
                <View style={{ justifyContent: 'center', padding: 5, opacity: .5,  }}>
                    {/* <Image source={item} style={{ tintColor: item.unlocked ? 'none' : 'black', width: 120, height: 120, resizeMode: 'contain', justifyContent: 'center',  }}></Image>
                    <Text style={{ position: 'absolute', left: '50%', color: "#FFFFFF", fontSize: 32 }}>
                        {item.unlocked ? '' : '?'}
                    </Text> */}
                    <Image source={item} style={{ width: 120, height: 120, resizeMode: 'contain', justifyContent: 'center',  }}></Image>
                </View>
                <Text style={{ alignSelf: 'center' }}> Bird Name </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={this.state.encyclopediaList}
                    numColumns={3}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
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
    }
});