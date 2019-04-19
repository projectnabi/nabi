import React from 'react';
import { Button, View, Text } from 'react-native';
import HomeScreen from './components/HomeScreen'
import StatScreen from './components/StatScreen'
import ProjectScreen from './components/ProjectScreen'
import ProjectSwipe from './components/ProjectSwipe'
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator, CardStackStyleInterpolator } from 'react-navigation';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from './store/configureStore'
const { persistor, store } = configureStore()

import * as actions from './store/actions'

// Version can be specified in package.json




const Drawer = createDrawerNavigator({
  Home: { screen: HomeScreen, },
  Timeline: { screen: ProjectSwipe },
  Encyclopedia: { screen: ProjectSwipe },
  RetirementHome: { screen: ProjectSwipe },
  Acheivments: { screen: ProjectSwipe },
  Settings: { screen: ProjectSwipe },

})

Drawer.navigationOptions = {
  header: null
}

const AppStack = createStackNavigator(
  {
    Home: Drawer,
    Project: ProjectScreen,
    Stats: StatScreen,
    Swipe: ProjectSwipe,
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

const onBeforeLift = () => {
  // take some action before the gate lifts
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={null}
          onBeforeLift={onBeforeLift}
          persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

