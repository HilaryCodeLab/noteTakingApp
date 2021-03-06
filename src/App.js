
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBRow, MDBTable, MDBTableHead, MDBTableBody, MDBFormInline, MDBIcon, MDBListGroup, MDBListGroupItem
} from 'mdbreact';
import React,{Component} from 'react';
import NavbarPage from "./components/NavBarPage";
import {Link} from "react-router-dom";
import './App.css';
import firebase from './Firebase';
import SearchFilter from "./components/SearchFilter";
// eslint-disable-next-line import/no-webpack-loader-syntax


class App extends Component{
constructor(props){
    super(props);
    // eslint-disable-next-line no-undef
    this.ref = firebase.firestore().collection("notes");
    this.unsubscribe=null;
    // eslint-disable-next-line import/no-webpack-loader-syntax

    this.state={
        notes:[],
        search:'',
        data:[]

    }
}

onCollectionUpdate = (querySnapshot) =>{
    const notes = [];
    querySnapshot.forEach((doc)=>{
        const {title,date,type,description}=doc.data();
        notes.push({
            key:doc.id,
            doc,
            title,
            date,
            type,
            description,

        });
    });
    this.setState({notes});
};

componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

}
//onChange
onChange = (e) =>{
  this.setState({search:e.target.value});
};

    render(){
        const noteList = this.state.notes;
        // const {search} = this.state;
        // const {countries} =this.state;
        // const filteredNotes = noteList.filter(note=>{return note.title.toLowerCase().indexOf(search.toLowerCase())!==-1});
        // const noteArr = this.state.data;
        // const filteredCountries = countryList.filter(country=>{return country.name.toLowerCase().indexOf(search.toLowerCase())!==-1});

        return (
            <MDBContainer fluid>
                <MDBRow>
                    <NavbarPage/>
                </MDBRow>
                <MDBRow>
                    <h4><Link to="/create">Add Note</Link></h4>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBTable striped>
                            <MDBTableHead>
                                <tr>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    noteList.map(note =>
                                        <tr>
                                            <td>{note.date}</td>
                                            <td>{note.type}</td>
                                            <td><Link to={`/show/${note.key}`}>{note.title}</Link></td>
                                            <td>{note.description}</td>
                                        </tr>
                                    )}
                            </MDBTableBody>
                        </MDBTable>
                    </MDBCol>
                    <MDBCol md="6">
                        <SearchFilter/>
                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        );

    }
}

export default App;