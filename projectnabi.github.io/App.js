import React from 'react';
import { Button, View, Text } from 'react-native';
import HomeScreen from './components/HomeScreen'
import ProjectScreen from './components/ProjectScreen'
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Project: ProjectScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
