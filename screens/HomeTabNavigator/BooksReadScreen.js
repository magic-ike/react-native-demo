import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class BooksRead extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>BooksRead</Text>
      </View>
    );
  }
}
export default BooksRead;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
