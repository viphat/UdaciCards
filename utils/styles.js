import { StyleSheet } from 'react-native'
import { white, gray } from './colors'

export const styles = StyleSheet.create({
  mainContainer:  {
    justifyContent: 'center',
    flex: 1,
  },
  addContainer: {
    backgroundColor: white,
    justifyContent: 'space-around',
    padding: 50,
    flex: 1
  },
  addDeckTitle: {
    fontSize: 36,
  },
  addTextInput: {
    borderBottomWidth: 1,
    paddingBottom: 10,
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
