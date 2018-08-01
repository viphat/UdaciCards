import React from 'react'
import { AsyncStorage, Platform, StyleSheet, Text, View, StatusBar } from 'react-native'
import { white, purple } from './utils/colors'
import { Constants } from 'expo'
import Deck from './components/Deck'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import QuizView from './components/QuizView'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { setLocalNotification } from './utils/notifications.js'

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

const stackNavigationOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: purple,
  },
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: MainTabsNavigator,
      navigationOptions: stackNavigationOptions,
    },
    DeckDetails: {
      screen: Deck,
      navigationOptions: stackNavigationOptions,
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: stackNavigationOptions,
    },
    QuizView: {
      screen: QuizView,
      navigationOptions: stackNavigationOptions,
    }
  },
  {
    initialRouteName: 'Home',
  },
)

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
        <RootStack />
      </View>
    );
  }
}
