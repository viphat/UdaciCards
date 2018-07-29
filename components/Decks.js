import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { getDecks } from '../utils/api'
import { styles } from '../utils/styles'
import { AppLoading } from 'expo'
import { _ } from 'lodash'

export default class Decks extends Component {
  state = {
    ready: false,
    decks: []
  }

  getAllDecks() {
    getDecks()
      .then((decks) => {
        this.setState(() => ({
          decks: decks,
          ready: true
        }))
      })
  }

  componentDidMount() {
    this.props.navigation.addListener(
      'didFocus',
      () => {
        this.getAllDecks()
      }
    )

    this.getAllDecks()
  }

  openDeck = (id) => {
    this.props.navigation.navigate('DeckDetails', { deckId: id })
  }

  renderItem = (item) => {
    const deck = item.item
    return (
      <TouchableOpacity onPress={() => this.openDeck(deck.id)}>
        <View style={styles.deckItem}>
          <Text style={styles.deckTitle}>{ deck.title }</Text>
          <Text style={styles.deckCardsCount}>{deck.questions.length} cards</Text>
        </View>
      </TouchableOpacity>
    )
  }

  mapDecksToArray = (decks) => {
    const keys = Object.keys(decks)
    return keys.map((key) => _.merge(decks[key], {id: key}))
  }

  render () {
    const { ready, decks } = this.state
    if (ready === false) {
      return <AppLoading />
    }
    const arrayDecks = this.mapDecksToArray(decks)
    return (
      <View style={styles.mainContainer}>
        { arrayDecks.length > 0 &&
          <FlatList
            data={arrayDecks}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        }
      </View>
    )
  }
}
