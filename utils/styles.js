import { StyleSheet } from 'react-native'
import { white, gray } from './colors'

export const styles = StyleSheet.create({
  decksContainer:  {
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
