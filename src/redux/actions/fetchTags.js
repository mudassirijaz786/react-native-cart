import {actionTag} from './index';
import XMLParser from 'react-xml-parser'
function fetchTagUsingAPI(){
    return dispatch => {
        let request = new Request("https://space-rental.herokuapp.com/users/get_xml.xml");
        fetch(request)
        .then((results) => {
            results
            .text()
            .then(( str ) => {
                let responseDoc = new XMLParser().parseFromString(str, 'application/xml')
                let array = []
                //console.log("loop start")
                const lengthOfTag = responseDoc.getElementsByTagName('CD').length
                for(i=0;i<lengthOfTag;i++){ 
                    const lengthOfChildrenTag = responseDoc.getElementsByTagName('CD')[i].children.length 
                    for(j=0;j<lengthOfChildrenTag;j++){
                        //console.log(responseDoc.getElementsByTagName('CD')[i].children[j].value);
                        array.push(responseDoc.getElementsByTagName('CD')[i].children[j].value)
                    }
                }
                //console.log("loop end")
                //console.log("Array", array)
                dispatch(actionTag(array))
                return array
            })
        }).catch(err=>{
            console.log(err)
        })        
    }
}
export default fetchTagUsingAPI
