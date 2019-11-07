import React, { Component } from "react";
import { AppRegistry,  StyleSheet, Dimensions, View , Button, Text } from "react-native";
// import { TabNavigator } from "react-navigation";
// import { Container, Text } from "native-base";
import MapView, { PROVIDER_GOOGLE , Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
// import GoogleAPIAvailability from "react-native-google-api-availability-bridge"

class Maps extends Component {
  
    constructor(props) {
      super(props);

      this.state = {
        lastLat: 0.0000,
        lastLong: 0.0000,
        latitude: 0.0000,
        longitude: 0.0000,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,

        mycoords: {
          latitude: 0.000,
          longitude: 0.000
        }

      };

    }

    // watchID = null;
    componentDidMount = () => {

      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );

    }

    submitHandler = () => {

      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            lastLat: position.coords.latitude,
            lastLong: position.coords.longitude,
          });
        },
        (error) => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 500 }
      );

    //   this.watchID = Geolocation.watchPosition( 
    //     (position) => {
    //       this.setState({
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //       });
    //     },
    //     (error) => alert(error.message),
    //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 500 , distanceFilter: 1}
    //   );
    };

    // componentWillUnmount = () => {
    //   Geolocation.clearWatch(this.watchID);
    // }


    setNewLocation(coordinate){
      //alert("User location changed MAP SHOULDNT MOVE")
      this.setState({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,

          mycoords: {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
          }
      });
      console.log("this.state.mycoords" , this.state.mycoords);
    }

    render() {
      
      return (
        <View style = {styles.container}>
          {/* <Text>Please update Google Play Services to view map</Text>
          <TouchableHighlight onPress={() => GoogleAPIAvailability.openGooglePlayUpdate()}>
            <Text>Update</Text>
          </TouchableHighlight> */}
          <MapView 
            provider = { PROVIDER_GOOGLE }
            style={styles.map} 
            showsUserLocation = {true}
            showsMyLocationButton={true}
            onPress={ (event) => this.setNewLocation(event.nativeEvent.coordinate) }
            onUserLocationChange={event => this.setNewLocation(event.nativeEvent.coordinate)}
            
            initialRegion={{
              latitude: 31.8025259,//this.state.latitude,
              longitude: 74.4351431,//this.state.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>

            <Polyline
                coordinates={[
                              { latitude: 31.8025259, longitude: 74.4351431 },
                              { latitude: 31.7896386, longitude: 74.421646 },
                              { latitude: 31.7665248, longitude: 74.4161628 },
                            //   this.state.mycoords,
                             ]}
                strokeColor="#000"
                strokeColors={[
                  '#7F0000',
                  '#00000000',
                  '#B24112',
                  '#E5845C',
                  '#238C23',
                  '#7F0000'
                ]}
                strokeWidth={5}
            />

          </MapView>

            
        
          <Button
                    title="Start tracking" 
                    style={styles.placeName}
                    onPress={this.submitHandler}
          />

           <Text style = {styles.boldText}>
              Start tracking from:
           </Text>

           <Text>
                {this.state.lastLat}
            </Text>
            <Text>
                {this.state.lastLong}
            </Text>
            
           <Text style = {styles.boldText}>
              Current position:
           </Text>

           <Text>
                {this.state.latitude}
            </Text>
            <Text>
                {this.state.longitude}
            </Text>

        </View>
     )
  }
}


const styles = StyleSheet.create ({
  // commented section code is when map is showing.....................
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  boldText: {
     fontSize: 30,
     color: 'red',
  },

//   container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
});

export default Maps;