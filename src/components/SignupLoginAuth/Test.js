import React, { Component } from 'react';
import {Router, Stack, Scene, Actions} from 'react-native-router-flux';

import {Text, TouchableOpacity, View} from "react-native"
export default class Test extends Component {
	testBack(){
		Actions.testBackToLogin()
	}
	render() {
		return(
               <View>
					<Text>After login</Text>
					<TouchableOpacity onPress={this.testBack}><Text> Back to login</Text></TouchableOpacity>
			   </View>

			)
	}
}