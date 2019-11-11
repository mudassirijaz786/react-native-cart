import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import Tags from './Tags'
import { electronics } from './Data'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {addToList} from "../../redux/actions/index"
class ElectronicsScreen extends Component {

    static navigationOptions = {
        headerTitle: 'Available Locations'
    }

    render() {
        return (
            <View style={styles.container}>
                <Tags products={electronics} onPress={this.props.addItemToCart} />
                {/* <Tags products={electronics} /> */}
                <Tags products={electronics} onPress={this.props.removeItemFromCart} />

            </View>
        );
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({
    addItemToCart: payload => addToList(payload),
    removeItemFromCart: payload => removeFromList(payload),

}, dispatch)
export default connect(null, mapDispatchToProps)(ElectronicsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});