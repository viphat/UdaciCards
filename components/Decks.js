import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../actions'
import { _getDecksApi } from '../utils/api'
import { AppLoading } from 'expo'
import { white, gray } from '../utils/colors'

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

  renderItem = (item) => {
    const deck = item.item
    return (
      <View style={styles.deckItem}>
        <Text style={styles.deckTitle}>{ deck.title }</Text>
        <Text style={styles.deckCardsCount}>{deck.questions.length} cards</Text>
      </View>
    )
  }

  render () {
    const { arrayOfDecks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container:  {
    justifyContent: 'center',
  },
  deckItem: {
    backgroundColor: white,
    padding: 50,
    borderBottomWidth: 1,
    flex: 1
  },
  deckTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  deckCardsCount: {
    textAlign: 'center',
    fontSize: 16,
    color: gray,
  }
})

function mapStateToProps (decks) {
  const keys = Object.keys(decks)
  const arrayOfDecks = keys.map((key) => decks[key])
  return {
    arrayOfDecks
  }
}

export default connect(mapStateToProps)(Decks)
