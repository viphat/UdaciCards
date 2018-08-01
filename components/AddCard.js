import React, { Component } from 'react'
import { View, TextInput, Text } from 'react-native'
import { styles } from '../utils/styles'
import { addCard } from '../utils/api'
import UdaciButton from './UdaciButton'

export default class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }

  state = {
    question: null,
    answer: null
  }

  submit = () => {
    const { question, answer } = this.state
    const { navigation } = this.props
    if (question.length === 0 || answer.length === 0) {
      return
    }

    addCard({key: navigation.getParam('deckId'), question, answer})

    this.setState(() => ({
      question: null,
      answer: null,
    }))

    navigation.goBack()
  }

  render () {
    return (
      <View style={styles.addContainer}>
        <TextInput
          style={styles.addTextInput}
          placeholder='Question'
          onChangeText={(text) => this.setState({ question: text })}
          value={this.state.question}
        />
        <TextInput
          style={styles.addTextInput}
          placeholder='Answer'
          onChangeText={(text) => this.setState({ answer: text })}
          value={this.state.answer}
        />
        <UdaciButton
          onPress={this.submit}
        >
          <Text>Create</Text>
        </UdaciButton>
      </View>
    )
  }
}
