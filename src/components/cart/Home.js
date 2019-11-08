import React from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  View,
  Text,
  Switch,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  Alert
} from 'react-native';

import {Actions} from 'react-native-router-flux';


export default class Home extends React.Component {
    ActionOnLocation(){
        Actions.tags()
    }
    ActionOnCart(){
        Actions.show()
    }
    render(){

        return(
            <View>
                <Text>Hey from home</Text>
                <TouchableOpacity onPress={this.ActionOnLocation}><Text>View LOCATION screen</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.ActionOnCart}><Text>View CART screen</Text></TouchableOpacity>

            </View>

        )
    }
  
}
