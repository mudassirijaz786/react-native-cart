'use strict';

import React, {Component}  from 'react';
import {View, Text, TextInput, TouchableHighlight} from 'react-native';
import ValidationComponent from '';

export default class Signup extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {name : "My name", email: "tibtib@gmail.com", number:"56", date: "2017-03-01"};
  }

  _onPressButton() {
    // Call ValidationComponent validate method
    this.validate({
      name: {minlength:3, maxlength:7, required: true},
      email: {email: true},
     
    });
  }

  render() {
      return (
        <View>
          <TextInput ref="name" onChangeText={(name) => this.setState({name})} value={this.state.name} />
          <TextInput ref="email" onChangeText={(email) => this.setState({email})} value={this.state.email} />
          {this.isFieldInError('date') && this.getErrorsInField('date').map(errorMessage => <Text>{errorMessage}</Text>) }

          <TouchableHighlight onPress={this._onPressButton}>
            <Text>Submit</Text>
          </TouchableHighlight>

          <Text>
            {this.getErrorMessages()}
          </Text>
        </View>
      );
  }

}