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



const App: () => React$Node = () => {
  return (
      <View >
          <View style={{flexDirection: 'column', height: 500, padding: 10}}>
            <Tags/>
        </View>
      </View>
  );
};



export default App;
