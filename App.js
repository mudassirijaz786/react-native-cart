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
import DistanceMaps from "./src/components/SignupLoginAuth/DistanceMaps"
import TestExample from "./src/components/SignupLoginAuth/TestExample"
import SimpleMaps from "./src/components/SignupLoginAuth/SimpleMaps"
import RouteCart from "./src/components/cart/RouteCart"
import configureStore from "./src/redux/store/index"
import {Provider} from "react-redux"
import S from "react-native-side-menu"
import BasicMenu from "./src/components/cart/BasicMenu"
const store = configureStore()
export default class App extends React.Component  {
  render(){
    // const menu = <Menu navigator={navigator}/>;
 
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
            {/* <SimpleMap/> */}
            {/* <SimpleMaps/> */}

            {/* <DistanceMaps/> */}
            {/* <TestExample/> */}
            
            <Provider store={store}> 
              <RouteCart/>
            </Provider>

            {/* <BasicMenu/> */}
        </View>
      </View>
  );
  }
  
};
