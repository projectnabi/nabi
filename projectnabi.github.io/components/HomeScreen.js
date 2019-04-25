import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import images from '../util'
import Card from './ProjectCard'
import AddModal from './AddModal';
import { connect } from 'react-redux'
//import projectData from '../Data/projectData';

// The component renders the home screen, displaying the users list of projects
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: this.props.projectList
    }
  }

  // Removes App Bar
  static navigationOptions = {
    header: null,
  }

  // Stores and fetches the project data
  componentWillMount() {
    for (let id in this.state.projectList) {
      this.state.projectList[id].id = id
    }
    this.setState({ projectList: Object.values(this.state.projectList) })
  }

  componentWillReceiveProps(nextProps) {
    for (let id in nextProps.projectList) {
      nextProps.projectList[id].id = id
    }
    this.setState({ projectList: Object.values(nextProps.projectList) })
  }

  // Stores and fetches the component key
  _keyExtractor = (item, index) => item.id;

  // This function makes each component to be clickable and navigate the user to the appropriate project
  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={() => {
        const { navigate } = this.props.navigation
        navigate('Swipe', { projectID: item.id })
      }}>
        <Card
          title={item.title} name={item.name} /*image={images[item.img]}*/ amount={item.amount} width={150} height={200} />
      </TouchableOpacity>
    )
  }

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
        <Ionicons name="ios-add-circle" size={40} color="#ceeeb0" onPress={this._onPressAdd}
          style={styles.floatingButton} activeOpacity={0} />
        <Ionicons name="ios-menu" size={32} color="black" onPress={() => this.props.navigation.openDrawer()} style={styles.menu} />
        <AddModal ref={'addModal'} parentFlatList={this}>
        </AddModal></View>
    );
  }
}

const mapStateToProps = state => ({
  projectList: state.projectList
})

HomeScreen = connect(mapStateToProps)(HomeScreen)
export default HomeScreen

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