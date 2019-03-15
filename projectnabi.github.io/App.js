import React from 'react';
import { Button, View, Text } from 'react-native';
import HomeScreen from './components/HomeScreen'
import ProjectScreen from './components/ProjectView'
import ProjectView from './components/ProjectView'
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'; // Version can be specified in package.json




const Drawer = createDrawerNavigator({
  Dashboard : { screen : ProjectView }
})

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Project: ProjectScreen,
    Dashboard: Drawer
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(AppStack);




// const appSwitchNavigator  = createSwitchNavigator({
//   Home : {screen : HomeScreen},
//   Project: {screen : ProjectView},
//   DashboardStack: ProjectView,
// })

// const AppContainer = createAppContainer(appSwitchNavigator );


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

