import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class Tags extends Component {

    renderProducts = (products) => {
        console.log(products)
        return products.map((item, index) => {
            return (
                <View key={index} style={{ padding: 20 }}>
                     <Text>{item.name + " and " + item.price}</Text>
                    <Button onPress={() => this.props.onPress(item)} title="Add to cart"/>
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