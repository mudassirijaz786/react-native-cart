/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Tags from './src/components/Tags'

import Route from './src/components/Route';
import SignupAuth from "./src/components/auth/Signup"

const App: () => React$Node = () => {
  return (
      <View >
          <View style={{flexDirection: 'column', height: 500, padding: 10}}>
            <Text>Main application</Text>
            {/* <Tags/> */}
            {/* <Route/>         */}
            <SignupAuth/>
        </View>
      </View>
  );
};



export default App;
