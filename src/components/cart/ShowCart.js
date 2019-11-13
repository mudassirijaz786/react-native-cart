import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Button
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
                <Text style={styles.titleText}>Locations saved in List</Text>
                <Text style={styles.secondaryText}>You have {this.props.listItems.length} saved locations </Text>
                <FlatList
                data={this.props.listItems}
                renderItem={({item, index,separators}) => (
                    <TouchableOpacity
                    //   onPress={this.props.removeItemFromCart}
                        
                      onShowUnderlay={separators.highlight}
                      onHideUnderlay={separators.unhighlight}>
                      <View style={styles.itemsInFlatList}>
                        <Text>{item.name}</Text>
                        <Button color="indigo"onPress={()=>this.deleteItemt(item)} title="Remove"></Button>
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
        justifyContent: 'center',
        marginBottom: 400,
        height: hp('100%'), // 70% of height device screen
        width: wp('100%'),
    },
    titleText: {
        fontSize: 25,
        textAlign: 'center',

    },
    secondaryText: {
        fontSize: 20,
        color: "indigo",
        marginBottom: 50,
         height: hp('10%'), // 70% of height device screen
        width: wp('100%'),
        textAlign: 'center',

    },
    itemsInFlatList: {
        marginBottom: 25
    }
});