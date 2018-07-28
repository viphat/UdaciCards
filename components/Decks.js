import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../actions'
import { _getDecksApi } from '../utils/api'
import { styles } from '../utils/styles'
import { AppLoading } from 'expo'
// import Deck from './Deck'

class Decks extends Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    _getDecksApi()
      .then((decks) => dispatch(getDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  openDeck (id) {
    console.log(id)
  }

  renderItem = (item) => {
    const deck = item.item
    return (
      <TouchableOpacity onPress={this.openDeck(item.title)}>
        <View style={styles.deckItem}>
          <Text style={styles.deckTitle}>{ deck.title }</Text>
          <Text style={styles.deckCardsCount}>{deck.questions.length} cards</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    const { arrayOfDecks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }
    return (
      <View style={styles.decksContainer}>
        { arrayOfDecks.length > 0 &&
          <FlatList
            data={arrayOfDecks}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        }
      </View>
    )
  }
}

function mapStateToProps (decks) {
  const keys = Object.keys(decks)
  const arrayOfDecks = keys.map((key) => decks[key])
  return {
    arrayOfDecks
  }
}

export default connect(mapStateToProps)(Decks)
