import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from './ProjectCard'
import AddModal from './AddModal';
import projectData from '../Data/projectData';

// The component renders the home screen, displaying the users list of projects
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: []
    };
  }

  // Removes App Bar
  static navigationOptions = {
    header: null,
  }

  // Stores and fetches the project data
  componentWillMount() {
    this.setState({ projectList: projectData.projectList })
  }

 // Stores and fetches the component key
  _keyExtractor = (item, index) => item.id;

  // This function makes each component to be clickable and navigate the user to the appropriate project
  _renderItem = ({ item }) => (
    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
      const { navigate } = this.props.navigation
      navigate('Swipe', { projectID: item.id })
    }}>
      <Card
        title={item.title} name={item.name} image={item.img} amount={item.amount} width={150} height={200}/>
    </TouchableOpacity>
  )

  _onPressAdd = () => {
    this.refs.addModal.showAddModal()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView >
          <FlatList contentContainerStyle={styles.container}
            data={this.state.projectList}
            extraData={this.state}
            numColumns={2}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </ScrollView>
        <AddModal ref={'addModal'} parentFlatList={this}>
        </AddModal>
          <Ionicons name="ios-add-circle" size={40} color="#ceeeb0" onPress={this._onPressAdd}
           style={styles.floatingButton} activeOpacity={0}/>
          <Ionicons name="ios-menu" size={32} color="black" onPress={() => this.props.navigation.openDrawer()} style={styles.menu}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginTop: 70
  },
  floatingButton: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  menu: {
    position: 'absolute',
    top: 30,
    left: 30,
  }
});