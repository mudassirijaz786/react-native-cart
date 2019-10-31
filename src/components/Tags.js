import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchTagUsingAPI from '../redux/actions/fetchTags';
import setSearchText from '../redux/actions/search'
import {actionTagDelete} from '../redux/actions/index'
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
    searchingTagEvent(event){
        console.log("START" , event)
        this.props.searching(event)
        console.log("END")
    }
    render() {
        const tags = this.props.gettingTags || this.props.searchResults;    
        //console.log("Getting Tags", tags)
        return (
            <View style={styles.container}>
                <TextInput
                   placeholder="Search"
                   onChangeText={this.searchingTagEvent}
                   onClear={text =>clear(text)}
                ></TextInput>
                <FlatList
                    data={tags}
                    renderItem={({key,item})=>
                        <TouchableOpacity
                            onPress={()=>this.deleteTagEvent(item)}  
                        >
                            <Text style={styles.tagStyle} >{item}</Text>
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
    searchResults: state.tags.searchArray
})

const mapDispatchToProps = dispatch => bindActionCreators({
    tagComponentDidMount: fetchTagUsingAPI,
    deleteTag: id => actionTagDelete(id),
    searching: event=> setSearchText(event)
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tags);