import React from 'react'
import { AsyncStorage, Platform, StyleSheet, Text, View, StatusBar } from 'react-native'
import { white, purple } from './utils/colors'
import { Constants } from 'expo'
import Deck from './components/Deck'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

function UdaciStatusBar ( { backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainTabsNavigator = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const RootStack = createStackNavigator(
  {
    Home: {
      screen: MainTabsNavigator,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      },
    },
    DeckDetails: {
      screen: Deck,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
)

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
        <RootStack />
      </View>
    );
  }
}
