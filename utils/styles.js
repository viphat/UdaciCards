import { StyleSheet } from 'react-native'
import { white, gray, red } from './colors'

export const styles = StyleSheet.create({
  mainContainer:  {
    justifyContent: 'center',
    flex: 1,
  },
  quizContainer: {
    justifyContent: 'space-around',
    flex: 1,
  },
  resultsContainer: {
    flex: 2,
    justifyContent: 'center',
    padding: 50,
  },
  resultsContent: {
    fontSize: 36,
    color: red,
  },
  quizContent: {
    fontSize: 36,
  },
  quizCountContainer: {
    flex: 1,
    paddingLeft: 10,
    marginTop: 20,
  },
  quizCountContent: {
    fontSize: 24,
    color: gray,
  },
  quizContentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    justifyContent: 'flex-end',
    flex: 2,
  },
  quizAnswerContainer: {
    flex: 2,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  quizAnswer: {
    fontSize: 28,
  },
  quizButtons: {
    flex: 2,
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
