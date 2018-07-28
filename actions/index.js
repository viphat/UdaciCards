export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
// export const GET_DECK = 'GET_DECK'

export function getDecks (decks) {
  return {
    type: GET_DECKS,
    decks,
  }
}

// export function getDeck (id) {
//   return {
//     type: GET_DECK,
//     deck,
//   }
// }

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}
