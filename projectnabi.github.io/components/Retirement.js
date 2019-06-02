import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Icon } from 'native-base';

import Card from './RetirementCard'
import EmptyCard from './EmptyCard'
import { connect } from 'react-redux'

//import projectData from '../Data/projectData';

// The component renders the home screen, displaying the users list of projects
class Retirement extends Component {
  static navigationOptions = {
    header: null,
    drawerIcon:
      <Ionicons name="ios-checkbox" size={30} />
  }

  constructor(props) {
    super(props);
    this.state = {
      projectList: this.props.projectList
    }

  }

  // Removes App Bar


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
      <Card
        project={item}
        width={500}
        height={200}
      />
    )
  }

  _onPressAdd = () => {
    this.refs.addModal.openModal()
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", }}>
        <View style={styles.nav} >
          <Ionicons name="ios-menu" size={32} color="black" onPress={() => this.props.navigation.openDrawer()} />
        </View>
        <ScrollView >
          <Text style={styles.title}>Retirement Home</Text>
          {this.state.projectList[0] !== undefined ?
            <FlatList contentContainerStyle={styles.container}
              data={this.state.projectList}
              extraData={this.state}
              numColumns={1}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
            : <EmptyCard />}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  projectList: state.completedProjects
})

Retirement = connect(mapStateToProps)(Retirement)
export default Retirement

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
    margin: 5
  },

  container: {
    flex: 1,
  },

  nav: {
    padding: 30,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});