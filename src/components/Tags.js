import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchTagUsingAPI from '../redux/actions/fetchTags';
import setSearchText from '../redux/actions/search'
import {actionTagDelete, searchResults} from '../redux/actions/index'
import {Text, View, FlatList, TouchableOpacity, StyleSheet, TextInput} from 'react-native'

class Tags extends Component {
    constructor(props){
        super(props)
    }
    componentWillMount() {
        const {tagComponentDidMount}=this.props;
        tagComponentDidMount()
    }
    deleteTagEvent(index){
        this.props.deleteTag(index);
    }
    search(event){
     
        console.log(event)
        this.props.searchResultsDispatch(event)
    }
  
    render() {
        const tags = this.props.gettingTags || this.props.searchedArray;
        const searched = this.props.searchedArray
      
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder = "search"
                 
                    onChangeText={ (e)=>this.search(e)}
                ></TextInput>
                <FlatList
                    data={tags, searched}
                    renderItem={({key,item})=>
                        <TouchableOpacity
                            onPress={()=>this.deleteTagEvent(item)}  
                        >
                            <Text style={styles.tagStyle} >{item || searched}</Text>
                        </TouchableOpacity> 
                    }
                    keyExtractor={(x,i)=>i}
                >
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
   
    tagStyle: {
      marginTop: 5,
      marginBottom: 5,
      backgroundColor: "#ffcc66",
      fontSize: 25,
      height: 50,
    }
})
const mapStateToProps = state => ({
   
    gettingTags: state.tags.tags,
    searchedArray: state.tags.searchArray,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    tagComponentDidMount: fetchTagUsingAPI,
    deleteTag: id => actionTagDelete(id),
    searchResultsDispatch: payload => searchResults(payload),
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tags);