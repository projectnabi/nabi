import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, TouchableHighlight, } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import ProjectScreen from './ProjectScreen'
import Card from './ProjectCard'
import Modal from './AddModal'
import AddModal from './AddModal';
import projectData from '../Data/projectData';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr : []
    };
    // this._onPressAdd = this._onPressAdd.bind(this)
  }
  static navigationOptions = {
    title: 'Home',
  };

  componentWillMount() {
    this.setState({ arr: projectData.projectLIst })
}

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <Card
      color={item.color} width={150} height={200}
    />
  )

  _onPressAdd = () => {
    this.refs.addModal.showAddModal()
  }

  render() {
    return (
      <View>
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
          <Ionicons name="ios-egg" size={32} color="dodgerblue" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20
    // marginVertical: 20,
  },
  floatingButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  }
});


