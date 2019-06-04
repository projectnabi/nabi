

import React, { Component } from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux'
import {
    Image,
    Text,
    View,
    FlatList,
    ScrollView,
    StyleSheet,
} from 'react-native';


// This component renders a project card component that display preview of the project, which will rendered in a list view
class EncyclopediaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foundBirds: [],
            encyclopediaPage: {}
        }
    }
    componentDidMount() {
        this.setState({
            foundBirds: this.props.foundBirds,
            encyclopediaPage: this.props.pageList
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            foundBirds: nextProps.foundBirds,
            encyclopediaPage: nextProps.pageList
        })

    }
    _keyExtractor = (item, index) => index

    _renderItem = ({ item }) => {
        if (this.state.foundBirds) {
            if (this.state.foundBirds.includes(item.version)) {
                item.unlocked = true
            }
        }
        if (item.version.endsWith('12') && !item.unlocked) {
            item.img = item.backupimg
        }
        return (
            <View style={{ paddingBottom: 20 }}>
                <View style={{ justifyContent: 'center', padding: 5, }}>
                    <Image source={item.img} style={{ tintColor: item.unlocked ? undefined : '#C8C8C8', width: 120, height: 120, resizeMode: 'contain', justifyContent: 'center', }}></Image>
                    {item.unlocked ? undefined : <FontAwesome style={{ position: 'absolute', left: '50%' }} color="#FFFFFF" name="lock" size={30} />}
                </View>
                <Text style={{ alignSelf: 'center' }}> {item.unlocked ? item.name : "???"} </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{this.state.encyclopediaPage.pageName}</Text>
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={this.state.encyclopediaPage.pageList}
                    extraData={this.state}
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
    },
    title: {
        fontSize: 28,
        paddingTop: 15,
        textAlign: 'center'
    }
});


const mapStateToProps = state => ({
    foundBirds: state.user.foundBirds,
})

EncyclopediaPage = connect(mapStateToProps)(EncyclopediaPage)

export default EncyclopediaPage