/**
 * Author: Sharath
 * Requirement provided:
 * arr = [8,1,3,2,4,1,7,3,1,3,2,1]
 * out = [1,1,1,1,3,3,3,2,2,7,8,4]
 * Input <> <submit>
 * [8][1][3][2][4]
 * <SORT>
 * [1][1][1][1][3]3,3,2,2,7,8,4]
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      inputValues: [],
      result: [],
      numArray: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  }

  //Function to sort the given input values in decending order of occurance
  sortSeqofOccurance() {
    let actualArr = [...this.state.inputValues]
    let counts = {};

    //Loop to find the count of occurance of each unique value
    for (let i in actualArr) {
      let num = actualArr[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    //Sort the array in decending order of occurance
    actualArr.sort((a, b) => counts[b] - counts[a])

    this.setState({ result: actualArr })
  }

  renderKeyboardNumbers(item) {
    return (
      <TouchableOpacity onPress={() => {
        let inputValues = [...this.state.inputValues]
        inputValues.push(item)
        this.setState({ inputValues })
      }}>
        <Text style={styles.keyStyle}>{item}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.container}>

          {/* Display typed input values */}
          <Text style={styles.alignCenter}>{`Input Values`}</Text>
          <View style={styles.boxStyle}>
            <Text>{`${this.state.inputValues}`}</Text>
          </View>
          <View style={styles.alighItemCenter}>

            {/* Render keyboard */}
            <FlatList
              numColumns={3}
              data={this.state.numArray}
              renderItem={({ item, index }) => this.renderKeyboardNumbers(item)}
              keyExtractor={(item, index) => index.toString()}
            />

            {/* Render Buttons */}
            <View style={{ flexDirection: 'row' }} >
              <Button onPress={() => { this.setState({ inputValues: [] }) }} title="Clear" />
              <Button onPress={() => { this.sortSeqofOccurance() }} title="Submit" />
            </View>
          </View>

          {/* Display output values */}
          <Text style={styles.alignCenter}>{`Output Values`}</Text>
          <View style={styles.boxStyle}>
            <Text>{`${this.state.result}`}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 10 },
  alignCenter: { alignSelf: 'center' },
  alighItemCenter: { alignItems: 'center' },
  boxStyle: { alignSelf: 'stretch', margin: 20, padding: 10, borderWidth: 1, borderColor: 'grey' },
  keyStyle: { backgroundColor: 'gray', margin: 20, padding: 20 }
});

export default App;
