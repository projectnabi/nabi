import React from 'react';
import HomeScreen from './components/HomeScreen'
import StatScreen from './components/StatScreen'
import ProjectScreen from './components/ProjectScreen'
import ProjectSwipe from './components/ProjectSwipe'
import CbtScreen from './components/cbtScreen'
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator, CardStackStyleInterpolator } from 'react-navigation';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from './store/configureStore'
const { persistor, store } = configureStore()

import * as actions from './store/actions'

// Version can be specified in package.json

// This stores all navigation routes for the Drawer
const Drawer = createDrawerNavigator({
  Home: { screen: HomeScreen, },
  Timeline: { screen: CbtScreen },
  Settings: { screen: CbtScreen },

})

// Removes App Bar
Drawer.navigationOptions = {
  header: null
}

// This Stores all navigation routes for the app
const AppStack = createStackNavigator(
  {
    Home: Drawer,
    Project: ProjectScreen,
    Stats: StatScreen,
    Swipe: ProjectSwipe,
    CBT: CbtScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

// Handles App Navigation
const AppContainer = createAppContainer(AppStack);

const onBeforeLift = () => {
  // take some action before the gate lifts
}

export default class App extends React.Component {
  render() {
    return (
      <MenuProvider>
        <Provider store={store}>
          <PersistGate
            loading={null}
            onBeforeLift={onBeforeLift}
            persistor={persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
      </MenuProvider>
      
    );
  }
}

