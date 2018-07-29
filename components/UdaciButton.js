import React, { Component } from 'react'
import { Platform, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, purple } from '../utils/colors'

export default function UdaciButton({children, onPress, btnStyle = {}, txtStyle = {}}) {
  return (
    <TouchableOpacity
      style={[Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn, btnStyle]}
      onPress={onPress}>
      <Text style={[styles.btnText, txtStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnText: {
    textAlign: 'center',
    color: white,
    fontSize: 22,
  },
  iosBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
