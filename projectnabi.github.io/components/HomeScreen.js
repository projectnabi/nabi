import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, TouchableHighlight, Button } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import ProjectScreen from './ProjectSwipe'
import Card from './ProjectCard'
import Modal from './AddModal'
import AddModal from './AddModal';
import projectData from '../Data/projectData';
import {createDrawerNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation'
import ProjectView from './ProjectScreen';
import { create } from 'uuid-js';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr : []
    };
  }
  // static navigationOptions = {
  //   title: 'Home',
  // };

  static navigationOptions = {
     header: null 
  }


  componentWillMount() {
    this.setState({ arr: projectData.projectList })
}

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <TouchableOpacity style = {{flex:1}} onPress={() => //this.props.navigation.navigate('Project')
    { const { navigate } = this.props.navigation
    navigate('Project', { projectID: item.id })
    }}>
    <Card
      title={item.title} name = {item.name} image = {item.img} amount = {item.amount} width={150} height={200}
    />
    </TouchableOpacity>
  )

  _onPressAdd = () => {
    this.refs.addModal.showAddModal()
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <ScrollView >
          <FlatList contentContainerStyle={styles.container}
            data={this.state.arr}
            extraData={this.state}
            numColumns={2}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </ScrollView>
        <AddModal ref = {'addModal'} parentFlatList={this}>

        </AddModal>
        <TouchableOpacity onPress={this._onPressAdd}
          style={styles.floatingButton}>
          <Ionicons name="ios-add-circle" size={40} color="#ceeeb0" />
        </TouchableOpacity>

        <TouchableOpacity onPress= { () => this.props.navigation.navigate('Swipe')}
          style={styles.menu}>
          <Ionicons name="ios-menu" size={32} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
}

// const appSwitchNavigator = createSwitchNavigator({
//   Home: { Screen: HomeScreen},
// })

// const appContainer = createAppContainer(appSwitchNavigator)


// const appDrawerNavigator = createDrawerNavigator({
//   Timeline : { Screen : ProjectView},
//   Encyclopedia : { Screen : ProjectView},
//   Retirement : { Screen : ProjectView},
//   Achievments : { Screen : ProjectView},
//   Settings : { Screen : ProjectView},
// })



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginTop: 70
    // marginVertical: 20,
  },
  floatingButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    top: 10,
    right: 10,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  menu: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    top: 10,
    left: 10,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  }
});


