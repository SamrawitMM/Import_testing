/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { getListofServiceProviders, getListofTransactions } from 'hover-tester';
import RadioForm from 'react-native-simple-radio-button';
//import axios from 'axios';






class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      providers: null,

    }
  }

  componentDidMount() {
    const { providers } = this.state;
    let api = getListofServiceProviders();
    api
      .then(response => {
        //console.log('getting data from axios', response);
        //setTimeout(() => {
        console.log('getting data from axios', response);
        this.setState({
          providers: response
        })
        //}, 90000);

      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          // Request made and server responded
          console.log("Request made and server responded");
          console.log("data is " + error.response.data);
          console.log("status code is " + error.response.status);
          console.log("header is" + error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("The request was made but no response was received");
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Something happened in setting up the request that triggered an Error");
          console.log('Error', error.message);
        }




      });
  }

  // #################
  onProviderSelect = (value) => {
    this.setState({ selectedProvider: value });
    console.log(value + " you have selected the value id ")

  }

  delayedPromise(ms, value) {
    return new Promise(resolve => {
      setTimeout(() => resolve(value), ms);
    });
  }



  renderPaymentMethods = () => {
    const { providers } = this.state;

    const radioProps = providers ? providers.map(provider => ({
      label: provider.task,
      value: provider._id,
    })) : <Text> Loading ... </Text>

    return (
      <RadioForm
        radio_props={radioProps}
        initial={0}
        animation={false}
        onPress={value => {
          this.onProviderSelect(value);
        }}
      />
    );



  }

  // ####################

  paymentMethod = () => {
    const { providers } = this.state;
    if (providers) {
      providers.map((provider, index) => {
        return (
          <Text key={provider._id}>{provider.task}</Text>

        )
      })
    }
    else {
      return (<Text>Loading ...</Text>)
    }
  }

  render() {
    const { providers } = this.state;
    return (

      <View>
        {

          this.renderPaymentMethods()
          //console.log( this.delayedPromise(5000, 'hey'))
        }


      </View>


    )


  }

}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
