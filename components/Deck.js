// import React, { Component } from 'react'
// import { View, Text, TouchableOpacity } from 'react-native'
// import { connect } from 'react-redux'
// import { getDeck } from '../actions'
// import { _getDeckApi } from '../utils/api'
// import { styles } from '../utils/styles'
// import { AppLoading } from 'expo'

// class Deck extends Component {
//   state = {
//     ready: false,
//   }

//   componentDidMount() {
//     const { id, dispatch } = this.props
//     _getDeckApi()
//       .then((deck) => dispatch(getDeck(deck)))
//       .then(() => this.setState(() => ({ready: true})))
//   }

//   render () {
//     const { deck } = this.props
//     return (
//       <View>
//         <Text>{ JSON.stringify(deck) }</Text>
//       </View>
//     )
//   }
// }

// export default connect()(Deck)
