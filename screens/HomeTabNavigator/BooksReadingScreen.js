import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class BooksReading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>BooksReading</Text>
      </View>
    );
  }
}
export default BooksReading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
