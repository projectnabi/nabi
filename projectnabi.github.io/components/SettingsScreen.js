import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    Switch,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux'
import * as Progress from 'react-native-progress';

import { updateSetting } from '../store/actions'
import { Ionicons, EvilIcons } from '@expo/vector-icons';

// This component renders a project card component that display preview of the project, which will rendered in a list view
class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: this.props.switchValue,
        }
    }
    // Removes App Bar
    static navigationOptions = {
        // header: null,
        drawerIcon:
            <Ionicons name="ios-settings" size={30} />
    }

    toggleSwitch = (value) => {
        this.setState({
            switchValue: value
        })
        this.props.dispatch(updateSetting('notifications', value))
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} >
                        <Ionicons name="ios-menu" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 32, marginBottom: 10 }}> Settings</Text>
                    <View></View>
                </View>
                <View style={{ padding: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <EvilIcons name="bell" size={30} color="black" style={{ paddingLeft: 5, paddingRight: 5 }} />
                            <Text style={{ fontSize: 20 }}>Notifications</Text>
                        </View>
                        <Switch value={this.state.switchValue}
                            onValueChange={this.toggleSwitch} />
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Time')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <EvilIcons name="clock" size={30} color="black" style={{ paddingLeft: 5, paddingRight: 5 }} />
                                <Text style={{ fontSize: 20 }}>Time</Text>
                            </View>
                            <Ionicons name="ios-arrow-forward" size={30} color='#C8C8C8' />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    switchValue: state.settings.notifications
})

SettingsScreen = connect(mapStateToProps)(SettingsScreen)
export default SettingsScreen

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 0,
    }

});