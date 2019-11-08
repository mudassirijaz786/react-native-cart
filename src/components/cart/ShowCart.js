import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { cartReducer } from "../../redux/reducers/cart";
import { connect } from "react-redux";


 class ShowCart extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>CART SECTION</Text>
                <Text>{this.props.cartReducer.length}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartReducer: state
    }
}

export default connect(mapStateToProps)(ShowCart)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});