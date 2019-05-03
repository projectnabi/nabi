import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

import images from '../assets/imgmap'
import Card from './ProjectCard'
import EmptyCard from './EmptyCard'
import AddModal from './AddModal';
import { connect } from 'react-redux'
import { updateLastSeen, markIncomplete, resetStreak } from '../store/actions'

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
    let prevTime = moment(this.props.lastSeen, 'x').local()
    let midnight = moment(prevTime).endOf('day').local()
    let curTime = moment().local()
    let dailyReset = false
    let diff = curTime.diff(prevTime, 'days', true)
    this.props.dispatch(updateLastSeen(curTime.format('x')))

    if (midnight.isBetween(prevTime, curTime)) {
      dailyReset = true
    }

    for (let id in this.state.projectList) {
      this.state.projectList[id].id = id

      if (dailyReset) {
        this.props.dispatch(markIncomplete(id))

        if (diff > 1) {
          this.props.dispatch(resetStreak(id))
        }
      }
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
          title={item.title} name={item.name} image={images[item.img]} amount={item.amount} width={150} height={200} type = {item.img} />
      </TouchableOpacity>
    )
  }

  _onPressAdd = () => {
    this.refs.addModal.openModal()
  }

  render() {
    return (
      <View style={{ flex: 1 ,justifyContent : "center", }}>
      {this.state.projectList[0] !== undefined ? 
        <ScrollView >
          <FlatList contentContainerStyle={styles.container}
            data={this.state.projectList}
            extraData={this.state}
            numColumns={2}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
          
        </ScrollView>
        : <EmptyCard/>}
        <Ionicons name="ios-add-circle" size={40} color="#ceeeb0" onPress={this._onPressAdd}
          style={styles.floatingButton} activeOpacity={0} />
        <Ionicons name="ios-menu" size={32} color="black" onPress={() => this.props.navigation.openDrawer()} style={styles.menu} />
        <AddModal ref={'addModal'} parentFlatList={this}>
        </AddModal></View>
    );
  }
}

const mapStateToProps = state => ({
  projectList: state.projectList,
  lastSeen: state.user.lastSeen
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
    top: 40,
    right: 30,
  },
  menu: {
    position: 'absolute',
    top: 40,
    left: 30,
  }
});