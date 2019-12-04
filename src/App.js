
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
        const {title,date,description}=doc.data();
        notes.push({
            key:doc.id,
            doc,
            title,
            date,
            description
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

//render countries, display filtered countries
// renderCountries=(country)=>{
//
//         return(
//             <MDBCard>
//                 <MDBCardBody>
//                     <MDBCardTitle>{country.name}</MDBCardTitle>
//                     <MDBCardText>{country.title}</MDBCardText>
//                 </MDBCardBody>
//             </MDBCard>
//         )
// };

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
                    <MDBCol>
                        <div className="active-pink-3 active-pink-4 mb-4">
                            <form className="form-inline mt-4 mb-4">
                                <MDBIcon icon="search"/>
                                <input className="form-control" type="text" placeholder="Search here" onChange={this.onChange}/>
                            </form>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                noteList.map(note =>
                                    <tr>
                                        <td>{note.date}</td>
                                        <td><Link to={`/show/${note.key}`}>{note.title}</Link></td>
                                        <td>{note.description}</td>
                                    </tr>
                                )}
                        </MDBTableBody>
                    </MDBTable>

                </MDBRow>
                <MDBRow>
                    Test Here....
                    <SearchFilter/>
                </MDBRow>


            </MDBContainer>
        );

    }
}

export default App;