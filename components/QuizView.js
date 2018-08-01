import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { styles } from '../utils/styles'
import UdaciButton from './UdaciButton'
import { red, green } from '../utils/colors'

export default class QuizView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  state = {
    questions: [],
    currentQuestion: null,
    currentQuestionIndex: 0,
    showAnswer: false,
    answeredQuestionsCount: 0,
  }

  answer = (result) => {
    console.log(result)
  }

  componentDidMount () {
    const { navigation } = this.props
    const { deck, questionIndex } = navigation.state.params
    const currentQuestionIndex = questionIndex || 0

    this.setState(() => ({
      questions: deck.questions,
      currentQuestion: deck.questions[currentQuestionIndex],
      currentQuestionIndex: currentQuestionIndex
    }))
  }

  render () {
    const { questions, currentQuestion, showAnswer, answeredQuestionsCount } = this.state
    if (currentQuestion === null) {
      return (
        <View style={styles.quizContainer}>
          <Text style={styles.quizContent}>Something went wrong!!!</Text>
        </View>
      )
    }

    return (
      <View style={styles.quizContainer}>
        <View style={styles.quizCountContainer}>
          <Text style={styles.quizCountContent}>
            { questions.length - answeredQuestionsCount } / { questions.length }
          </Text>
        </View>
        <View style={styles.quizContentContainer}>
          <Text style={styles.quizContent}>{ currentQuestion.question }</Text>
        </View>
        <View style={styles.quizAnswerContainer}>
          { showAnswer === false
              ? <Text style={[styles.quizAnswer, { color: red }]}>Answer</Text>
              : <Text style={styles.quizAnswer}>{ currentQuestion.answer }</Text>
          }
        </View>
        <View style={styles.quizButtons}>
          <UdaciButton
            btnStyle={{backgroundColor: green, marginBottom: 20}}
            onPress={() => this.answer('correct')}
          >
            <Text>Correct</Text>
          </UdaciButton>
          <UdaciButton
            btnStyle={{backgroundColor: red}}
            onPress={() => this.answer('incorrect')}
          >
            <Text>Incorrect</Text>
          </UdaciButton>
        </View>
      </View>
    )
  }
}
