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

export function _getDecksApi() {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then((results) => {
      return results === null
        ? setDummyData()
        : results
    })
}

export function _getDeckApi(id) {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then((results) => {
      return results[id] === undefined
        ? { }
        : results[id]
    })
}
