import { StyleSheet } from 'react-native'
import { white, gray } from './colors'

export const styles = StyleSheet.create({
  mainContainer:  {
    justifyContent: 'center',
  },
  deckItem: {
    backgroundColor: white,
    padding: 50,
    borderBottomWidth: 1,
    flex: 1
  },
  deckButtons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: white,
    padding: 50,
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
