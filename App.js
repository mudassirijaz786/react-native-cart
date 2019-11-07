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

// import Route from './src/components/Route';
import SignupAuth from "./src/components/auth/Signup"
// import Signup from "./src/components/SignupLoginAuth/Signup"
import Login from "./src/components/SignupLoginAuth/Login"
import Route from "./src/components/SignupLoginAuth/Route"
// import Signup from "./src/components/authValidation/Signup"
import Maps from "./src/components/SignupLoginAuth/Maps"
import Map from "./src/components/SignupLoginAuth/Map"
import MapTest from "./src/components/SignupLoginAuth/MapTest"
import SimpleMap from "./src/components/SignupLoginAuth/SimpleMap"

const App: () => React$Node = () => {
  return (
      <View >
          <View style={{flexDirection: 'column', height: 1000, padding: 10}}>
            {/* <Text>Main application</Text> */}
            {/* <Tags/> */}
            {/* <Route/>         */}
            {/* <Signup/> */}
            {/* <Login/> */}
            {/* <Route/> */}
            {/* <Signup/> */}
            {/* <Maps/> */}
            {/* <Map/> */}
            {/* <MapTest/> */}
            <SimpleMap/>
        </View>
      </View>
  );
};



export default App;
