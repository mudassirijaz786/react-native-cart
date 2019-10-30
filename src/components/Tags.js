import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchTagUsingAPI from '../redux/store/fetchTags';
import {getTags} from '../redux/store/reducer';

import {Text, View, FlatList, TouchableOpacity,StyleSheet} from 'react-native'

class Tags extends Component {
    constructor(props){
        super(props)
    }
    componentWillMount() {
        const {tagComponentDidMount}=this.props;
        tagComponentDidMount()
        //console.log("HIIII", this.props.tagComponentDidMount())
    }
    render() {
        const tags = this.props.gettingTags;
        
        console.log("Getting Tags", tags)
        return (
            <View style={styles.container}>
                <FlatList
                    data={tags}
                    renderItem={({key,item})=>
                        <TouchableOpacity  
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
    gettingTags: state.tags.tags
})

const mapDispatchToProps = dispatch => bindActionCreators({
    tagComponentDidMount: fetchTagUsingAPI
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tags);