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
  Alert,
  StyleSheet
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Colors } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Home extends React.Component {
    ActionOnLocation(){
        Actions.tags()
    }
    ActionOnCart(){
        Actions.show()
    }
    render(){
        return(
            <View style={styles.container}>
            
                <TouchableOpacity 
                    onPress={this.ActionOnLocation}>
                    <Text style={styles.secondaryText} >
                        Available Locations
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={this.ActionOnCart}>
                    <Text style={styles.secondaryText} >
                        Your Saved Locations
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 500,
        height: hp('100%'), // 70% of height device screen
        width: wp('100%'),
    },
    titleText: {
        marginTop: 30,
        fontSize: 25,
    },
    secondaryText: {
        fontSize: 20,
        color: "indigo"
    },

    
});

