import React, {Component} from 'react'
import {MDBContainer, MDBFormInline, MDBIcon, MDBListGroup, MDBListGroupItem, MDBTable, MDBTableBody} from "mdbreact";
import {Link} from "react-router-dom";

class SearchFilter extends Component{
    constructor(){
        super();
        this.state={
         search: ''
        };
    }

    updateSearch(event){
        this.setState({search:event.target.value.substr(0,20)});
    }

    render() {
        let filteredTitles = this.props.notes.filter(
            (note)=>{
                return note.title.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1;
            }
        )
        return(

            <MDBFormInline waves>
                <div className="md-form my-0">
                    <MDBIcon icon="search"/>

                    <input className="form-control mr-sm-2" type="text" placeholder="Search"
                           aria-label="Search" value={this.state.search} onChange={this.updateSearch.bind(this)}/>

                </div>
                <MDBContainer>
                    <MDBListGroup>

                    </MDBListGroup>
                </MDBContainer>
            </MDBFormInline>

        )
    }
}

export default SearchFilter;