/*This is an Example of React Native Map*/
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Actions} from 'react-native-router-flux';
import {getDistance, convertUnit} from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import React, { Component } from 'react';
import { View, Text, item } from 'react-native';
class DistanceMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    const { latitude, longitude } = this.state;

    const dist = getDistance(
        { latitude, longitude },
        { latitude: 33.935558, longitude: -117.284912 }
    );
    console.log(dist)
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        <Text>Miles: {convertUnit('mi', dist)}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}

export default DistanceMaps;