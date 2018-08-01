import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../utils/styles'
import UdaciButton from './UdaciButton'
import { red, green } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'

export default class QuizView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  state = {
    questions: [],
    currentQuestionIndex: 0,
    showAnswer: false,
    isFinish: false,
    correctAnswersCount: 0,
    incorrectAnswersCount: 0,
  }

  restartQuiz = () => {
    this.setState(() => ({
      currentQuestionIndex: 0,
      showAnswer: false,
      isFinish: false,
      correctAnswersCount: 0,
      incorrectAnswersCount: 0,
    }))
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  answer = (result) => {
    const { questions, currentQuestionIndex } = this.state

    this.setState((previousState) => ({
      correctAnswersCount:
        previousState.correctAnswersCount + (result === 'correct' ? 1 : 0),
      incorrectAnswersCount:
        previousState.incorrectAnswersCount + (result === 'incorrect' ? 1 : 0),
    }))

    if (currentQuestionIndex + 1 === questions.length) {
      // Finish Quiz if it's the last question.
      this.setState(() => ({ isFinish: true }))

      // Clear Notification
      clearLocalNotification()
        .then(setLocalNotification)
    } else {
      // Show Next Question Screen
      this.setState((previousState) => ({
        currentQuestionIndex: previousState.currentQuestionIndex + 1,
        showAnswer: false,
      }))
    }
  }

  componentDidMount () {
    const { navigation } = this.props

    const {
      deck, questionIndex
    } = navigation.state.params

    const currentQuestionIndex = questionIndex || 0

    this.setState(() => ({
      questions: deck.questions,
      currentQuestion: deck.questions[currentQuestionIndex],
      currentQuestionIndex: currentQuestionIndex,
      correctAnswersCount: this.state.correctAnswersCount || 0,
      incorrectAnswersCount: this.state.incorrectAnswersCount || 0,
    }))
  }

  render () {
    const {
      questions,
      showAnswer,
      currentQuestionIndex,
      correctAnswersCount,
      incorrectAnswersCount,
      isFinish,
    } = this.state

    const currentQuestion = questions[currentQuestionIndex]

    if (currentQuestion === undefined || currentQuestion === null) {
      return (
        <View style={styles.quizContainer}>
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsContent}>
              Something went wrong!!!
            </Text>
          </View>
        </View>
      )
    }

    if (isFinish === true) {
      const correctPercent = Math.round((correctAnswersCount / questions.length) * 100.0)
      return (
        <View style={styles.quizContainer}>
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsContent}>
              Congratulations, You did exactly {correctPercent}%
            </Text>
          </View>
          <View style={styles.quizButtons}>
            <UdaciButton
              btnStyle={{backgroundColor: red, marginBottom: 20}}
              onPress={this.restartQuiz}
            >
              <Text>Restart Quiz</Text>
            </UdaciButton>
            <UdaciButton
              btnStyle={{backgroundColor: green}}
              onPress={this.goBack}
            >
              <Text>Go Back</Text>
            </UdaciButton>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.quizContainer}>
        <View style={styles.quizCountContainer}>
          <Text style={styles.quizCountContent}>
            { questions.length - (correctAnswersCount + incorrectAnswersCount) } / { questions.length }
          </Text>
        </View>
        { showAnswer === false
            ?
              <View style={{flex: 2}}>
                <View style={styles.quizContentContainer}>
                  <Text style={styles.quizContent}>{ currentQuestion.question }</Text>
                </View>
                <View style={styles.quizLinkContainer}>
                  <TouchableOpacity onPress={() => this.setState(() => ({ showAnswer: true }))}>
                    <Text style={[styles.quizLink, { color: red }]}>Answer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            :
              <View style={{flex: 2}}>
                <View style={styles.quizContentContainer}>
                  <Text style={[styles.quizContent, { fontSize: 20 }]}>{ currentQuestion.answer }</Text>
                </View>
                <View style={styles.quizLinkContainer}>
                  <TouchableOpacity onPress={() => this.setState(() => ({ showAnswer: false }))}>
                    <Text style={[styles.quizLink, { color: red }]}>Question</Text>
                  </TouchableOpacity>
                </View>
              </View>
        }
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
