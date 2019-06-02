import React from 'react';
import HomeScreen from './components/HomeScreen'
import StatScreen from './components/StatScreen'
import ProjectScreen from './components/ProjectScreen'
import ProjectSwipe from './components/ProjectSwipe'
import CbtScreen from './components/cbtScreen'
import Encyclopedia from './components/Encyclopedia'
import { MenuProvider } from 'react-native-popup-menu';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator, DrawerItems,CardStackStyleInterpolator } from 'react-navigation';

import {
  Image,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from './store/configureStore'
const { persistor, store } = configureStore()
import * as actions from './store/actions'

let windowWidth = 0

// Version can be specified in package.json

// Custom Drawer
const CustomDrawer = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center' }} onLayout={(event => {
        var {x, y, width, height} = event.nativeEvent.layout;
        windowWidth = width * .8;
      })}>
          <Image source={require('./assets/iconWords.png')} style={{ width: windowWidth}} resizeMode="contain" />
      </View>
      <ScrollView style = {{marginTop: 10}}>
          <DrawerItems {...props} style={{ backgroundColor: "orange" }} />
      </ScrollView>
  </SafeAreaView>
);

// This stores all navigation routes for the Drawer
const Drawer = createDrawerNavigator({
  Home: { screen: HomeScreen, },
  Encyclopedia: { screen: Encyclopedia },
  Settings: { screen: CbtScreen },
}, {
  contentComponent : CustomDrawer,
  contentOptions: {
    activeTintColor: '#76b8c5',
    activeBackgroundColor: '#d8f5fa'
  }



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
    test: Encyclopedia,
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

