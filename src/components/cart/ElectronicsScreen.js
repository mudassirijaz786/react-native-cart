import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import Tags from './Tags'
import { electronics } from './Data'
import { connect } from 'react-redux'

class ElectronicsScreen extends Component {

    static navigationOptions = {
        headerTitle: 'Locations'
    }
    render() {
        return (
            <View style={styles.container}>
                <Tags products={electronics} onPress={this.props.addItemToCart} />
                {/* <Tags products={electronics} /> */}

            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (keyToAdd) => dispatch({ type: 'ADD_TO_CART', payload: keyToAdd })
    }
}

export default connect(null, mapDispatchToProps)(ElectronicsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});