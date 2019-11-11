import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import { connect } from 'react-redux'
import {removeFromList} from "../../redux/actions/index"
import { bindActionCreators } from 'redux';

class Tags extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {

    //     }
    // }
    renderProducts = (products) => {
        console.log("Products", products)
        // products.filter(item => item.id !==products.id)
        console.log("this.props.listItems", this.props.listItems)
        return products.map((item, index) => {
            var fl = this.props.listItems.length > 0 && this.props.listItems.filter(itemList => itemList.id == item.id)
            console.log("fl", fl[0])
            if(fl[0]){
                return (
                    <View key={index} style={{ padding: 20 }}>
                        <Text>{fl.name}</Text>
                        <Button onPress={() => this.props.removeItemFromCart(fl[0])} title="remove"/>
                    </View>
                )
            } else {
                return (
                    <View key={index} style={{ padding: 20 }}>
                        <Text>{item.name}</Text>
                        <Button onPress={() => this.props.onPress(item)} title="Save"/>
                    </View>
                )
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>{this.props.products.length} locations are availible</Text>
                {this.renderProducts(this.props.products)}
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listItems: state.carts
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({
    removeItemFromCart: payload => removeFromList(payload),

}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Tags)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    titleText: {
        fontSize: 25,
        textAlign: "center",
    },
});