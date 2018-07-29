import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { _getDeckApi } from '../utils/api'
import { styles } from '../utils/styles'
import { AppLoading } from 'expo'
import UdaciButton from './UdaciButton'
import { orange } from '../utils/colors'

export default class Deck extends Component {
  state = {
    ready: false,
    deck: { }
  }

  addCard () {
    //TODO
    console.log('Add Card')
  }

  startQuiz () {
    // To be implemented
    console.log('Start Quiz')
  }

  componentDidMount() {
    const { navigation } = this.props
    const deckId = navigation.getParam('deckId')

    _getDeckApi(deckId)
      .then((deck) => {
        this.setState(() => ({
          deck,
          ready: true
        }))
      })
  }

  render () {
    const { ready, deck } = this.state
    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={[styles.mainContainer, { alignItems: 'stretch', flex: 1 }]}>
        <View style={[styles.deckItem, {borderBottomWidth: 0}]}>
          <Text style={[styles.deckTitle, {fontSize: 32}]}>
            { deck.title }
          </Text>
          <Text style={[styles.deckCardsCount, { fontSize: 24, marginTop: 30 }]}>
            {deck.questions.length} cards
          </Text>
        </View>
        <View style={styles.deckButtons}>
          <UdaciButton
            btnStyle={{ backgroundColor: orange, marginBottom: 10 }}
            onPress={this.addCard}>
            Add Card
          </UdaciButton>
          <UdaciButton onPress={this.startQuiz}>
            Start Quiz
          </UdaciButton>
        </View>
      </View>
    )
  }
}
