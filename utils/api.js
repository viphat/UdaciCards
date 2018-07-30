import { AsyncStorage } from 'react-native'

const CARDS_STORAGE_KEY = 'UdaciCards:cards'

const dummyData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Golang: { title: 'Golang', questions: [ ] },
  RubyOnRails: { title: 'RubyOnRails', questions: [ ] },
  Python: { title: 'Python', questions: [ ] },
  TypeScript: { title: 'TypeScript', questions: [ ] },
  ReactNative: { title: 'ReactNative', questions: [ ] },
  English: { title: 'English', questions: [ ] }
}

function setDummyData() {
  AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}

export function getDecks() {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then((results) => {
      return results === null
        ? setDummyData()
        : JSON.parse(results)
    })
}

export function getDeck(id) {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then((results) => {
      results = JSON.parse(results)
      return results[id] === undefined
        ? { }
        : results[id]
    })
}

export function addDeck({deck, key}) {
  return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
    [key]: deck,
  }))
}

export function addCard({key, question, answer}) {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key].questions = data[key].questions || []
      data[key].questions.push({
        question,
        answer
      });
      AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(data))
    })
}
