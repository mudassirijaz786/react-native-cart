import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class Tags extends Component {

    renderProducts = (products) => {
        console.log("Products", products)
        products.filter(item => item.id !==products.id)
        return products.map((item, index) => {
            return (
                <View key={index} style={{ padding: 20 }}>
                    <Text>{item.name }</Text>
                     {/* {item.name.filter(i => i !==item.i)}? */}
                    <Button onPress={() => this.props.onPress(item)} title="Save this location"/>
                    <Button onPress={() => this.props.onPress(item)} title="Remove this location"/>

                </View>
            )
        })
    }



    render() {
        return (
            <View style={styles.container}>
                {this.renderProducts(this.props.products)}
            </View>
        );
    }
}
export default Tags;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});