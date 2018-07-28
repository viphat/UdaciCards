import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { purple } from './utils/colors'
import { Constants } from 'expo'
import Decks from './components/Decks'

function UdaciStatusBar ( { backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)} >
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <View>
            <Decks />
          </View>
        </View>
      </Provider>
    );
  }
}
