import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../utils/styles'
import { addDeck } from '../utils/api'
import UdaciButton from './UdaciButton'
import { NavigationActions } from 'react-navigation'

String.prototype.toCamelCase = function() {
  return this.replace(/\b(\w)/g, function(match, capture) {
    return capture.toUpperCase();
  }).replace(/\s+/g, '');
}

export default class AddDeck extends Component {
  state = {
    title: '',
    questions: []
  }

  submit = () => {
    const deck = this.state
    if (deck.title.length === 0) {
      return;
    }

    addDeck({deck: deck, key: deck.title.toCamelCase()})

    this.setState(() => ({
      title: '',
      questions: []
    }))

    this.toHome()
  }

  toHome() {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'Decks'
    }))
  }

  render () {
    return (
      <KeyboardAvoidingView
        style={styles.addContainer}
        behavior="padding"
        enabled
      >
        <Text style={styles.addDeckTitle}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.addTextInput}
          onChangeText={(text) => this.setState({ title: text })}
          value={this.state.title}
        />
        <UdaciButton
          onPress={this.submit}
        >
          <Text>Create Deck</Text>
        </UdaciButton>
      </KeyboardAvoidingView>
    )
  }
}
