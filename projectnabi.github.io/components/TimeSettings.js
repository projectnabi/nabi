import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    Switch,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Picker
} from 'react-native';

import { connect } from 'react-redux'
import * as Progress from 'react-native-progress';

import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { updateSetting } from '../store/actions'

// This component renders a project card component that display preview of the project, which will rendered in a list view
class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultTime: this.props.defaultTime,
        }
    }
    // Removes App Bar
    static navigationOptions = {
        header: null,
    }

    toggleSwitch = (value) => {
        this.setState({
            switchValue: value
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <Ionicons name="ios-arrow-back" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 32, }}> Time</Text>
                    <View></View>
                </View>
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Picker
                        selectedValue={this.state.defaultTime}
                        style={{}}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({ defaultTime: itemValue })
                            this.props.dispatch(updateSetting('initialTime', itemValue))
                        }}>
                        <Picker.Item label="2 Minutes" value={120} />
                        <Picker.Item label="5 Minutes" value={300} />
                        <Picker.Item label="10 Minutes" value={600} />
                    </Picker>

                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    defaultTime: state.settings.initialTime
})

SettingsScreen = connect(mapStateToProps)(SettingsScreen)
export default SettingsScreen

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30,
        paddingBottom: 0,
    }

});