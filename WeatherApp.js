'use strict';

import React from 'react-native';

import {
  Component,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput
} from 'react-native';

import Forecast from './Forecast'

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '08999',
      forecast: {
        main: 'Clouds',
        description: 'few clouds',
        temp: 45.7
      }
    };
  }

  render() {
    const {main, description, temp} = this.state.forecast;

    return (
      <View style={styles.container}>
        <Image
           source={require('./clouds.jpg')}
           resizeMode='cover'
           style={styles.backdrop}
        >
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                The weather in
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  onSubmitEditing={this.handleTextChange.bind(this)}
                  returnKeyType='go'
                  ></TextInput>
              </View>
            </View>
            <Forecast
              main={main}
              description={description}
              temp={temp}
            ></Forecast>
          </View>
        </Image>
      </View>
    );
  }

  handleTextChange(event) {
    const zip = event.nativeEvent.text;

    this.setState({zip: zip});

    fetch('http://api.openweathermap.org/data/2.5/weather?q='
      + zip + '&units=imperial&appid=a41236a638a6bcd34170dc77ce6c42f7')
      .then((response) =>  response.json())
      .then((responseJSON) => {
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
          }
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }
}

const baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    width: 50,
    height: baseFontSize,
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: '#FFFFFF'
  }
});

export default WeatherApp;