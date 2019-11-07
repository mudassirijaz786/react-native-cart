/*This is an Example of React Native Map*/
import React from 'react';
import { StyleSheet, Text, View , TextInput} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
 
export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
            <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
                latitude: 31.478064,
                longitude: 74.294370,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            >
            <Marker
                draggable
                coordinate={{
                latitude:31.478064,
                longitude:  74.294370,
                }}
                onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                title={'Faisal town'}
                description={'This is a description about faisal town'}
            />
            </MapView>
        </View>
        );
    }
}
    
    const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    map: {
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
    },
});