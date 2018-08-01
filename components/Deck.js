import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getDeck } from '../utils/api'
import { styles } from '../utils/styles'
import { AppLoading } from 'expo'
import UdaciButton from './UdaciButton'
import { orange, gray, blue } from '../utils/colors'

export default class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('deckId')
    }
  }

  state = {
    ready: false,
    deck: { }
  }

  addCard = () => {
    const { navigation } = this.props
    const deckId = navigation.getParam('deckId')
    navigation.navigate('AddCard', { deckId: deckId })
  }

  startQuiz = () => {
    // To be implemented
    const { navigation } = this.props
    const { deck } = this.state
    console.log(deck)
    navigation.navigate('QuizView', { deck: deck })
  }

  loadData (deckId) {
    getDeck(deckId)
      .then((deck) => {
        this.setState(() => ({
          deck,
          ready: true
        }))
      })
  }

  componentDidMount() {
    const { navigation } = this.props
    const deckId = navigation.getParam('deckId')

    navigation.addListener(
      'didFocus',
      () => {
        this.loadData(deckId)
      }
    )

    this.loadData(deckId)
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
          <UdaciButton
            onPress={this.startQuiz}
            btnStyle={{ backgroundColor: deck.questions.length === 0 ? gray : blue }}
            disabled={ deck.questions.length === 0 ? true : false }
          >
            Start Quiz
          </UdaciButton>
        </View>
      </View>
    )
  }
}
