'use strict';

import React from 'react-native';

import {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

class Forecast extends Component {

  render() {
    console.log(this.state);
    return (
      <View>
        <Text style={styles.bigText}>
          {this.props.main}
        </Text>
        <Text style={styles.welcome}>
          Current conditions: {this.props.description}
        </Text>
        <Text style={styles.bigText}>
          {this.props.temp} F
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigText: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFAAAA'
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: '#FFEEAA'
  }
});

export default Forecast;