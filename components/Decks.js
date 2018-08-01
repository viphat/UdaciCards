import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Animated } from 'react-native'
import { getDecks } from '../utils/api'
import { styles } from '../utils/styles'
import { AppLoading } from 'expo'
import { _ } from 'lodash'

export default class Decks extends Component {
  state = {
    ready: false,
    decks: [],
    bounceValue: new Animated.Value(1),
    selectedId: null,
  }

  loadData() {
    getDecks()
      .then((decks) => {
        this.setState(() => ({
          decks: decks,
          ready: true,
          bounceValue: new Animated.Value(1),
          selectedId: null,
        }))
      })
  }

  componentDidMount() {
    this.props.navigation.addListener(
      'didFocus',
      () => {
        this.loadData()
      }
    )

    this.loadData()
  }

  openDeck = (id) => {
    this.setState(() => ({ selectedId: id }))

    const { bounceValue } = this.state
    const animatedDuration = 500

    Animated.sequence([
      Animated.timing(bounceValue, { duration: animatedDuration, toValue: 1.3}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4})
    ]).start()

    setTimeout(() => {
      this.props.navigation.navigate('DeckDetails', { deckId: id })
    }, animatedDuration)
  }

  renderItem = (item) => {
    const deck = item.item
    const { selectedId, bounceValue } = this.state
    return (
      <TouchableOpacity onPress={() => this.openDeck(deck.id)}>
        <View style={styles.deckItem}>
          <Animated.Text
            style={[
              styles.deckTitle,
              { transform: [{scale: selectedId === deck.id ? bounceValue : 1}] }
            ]}>
            { deck.title }
          </Animated.Text>
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
