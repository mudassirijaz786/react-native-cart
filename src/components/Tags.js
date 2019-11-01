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
        //console.log("HIIII", this.props.tagComponentDidMount())
    }
    deleteTagEvent(index){
        //e.preventDefault();
        this.props.deleteTag(index);
    }
    search(event){
        // console.log("event",event)
        // const text = event.nativeEvent.event
        // console.log("text hhh",text)
        console.log(event)
        this.props.searchResultsDispatch(event)
    }
    // searchingTagEvent(event){
    //     console.log("START" , event)
    //     this.props.searching(event)
    //     console.log("END")
    // }
    render() {
        const tags = this.props.gettingTags || this.props.searchedArray;
        // console.log("SEARCHED ARRAY", this.props.searchedArray)
        const searched = this.props.searchedArray
        //console.log(tags)
        //const {actionTagDelete, value} = this.props;
        // const query = this.props.arr
        //console.log("Getting Tags", tags)
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder = "Procurar Trabalho"
                    //onChange={(e) => actionTagDelete(e.target.value)}
                    //value={value} 
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
    // tags: getTags(state)
    //state.rootReducer.stateInRedux
    gettingTags: state.tags.tags,
    searchedArray: state.tags.searchArray,
    //arr: state.tags.searchArray,
    // dataSource: state.tags.tags,
    // searchedData: state.tags.searchArray
    // key: state.tags.payload
    //data : state.tags


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