import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity
} from "react-native";

import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { bindActionCreators } from 'redux';
import {removeFromList} from "../../redux/actions/index"



 class ShowCart extends Component {
    deleteItemt(index){
        this.props.removeItemFromCart(index);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Items in List</Text>
                <Text>You have {this.props.listItems.length} saved locations</Text>
                <FlatList
                data={this.props.listItems}
                renderItem={({item, index,separators}) => (
                    <TouchableOpacity
                      onPress={this.props.removeItemFromCart}
                      onPress={()=>this.deleteItemt(item)}  
                      onShowUnderlay={separators.highlight}
                      onHideUnderlay={separators.unhighlight}>
                      <View style={{backgroundColor: 'white'}}>
                        <Text>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                    
                  )}
                keyExtractor={(x,i)=>i}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowCart)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});