
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


class App extends Component{
constructor(props){
    super(props);
    // eslint-disable-next-line no-undef
    this.ref = firebase.firestore().collection("notes");
    this.unsubscribe=null;
    this.state={
        notes:[]
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

    render(){
        return (
            <MDBContainer fluid>
                <MDBRow>
                    <NavbarPage/>
                </MDBRow>
                <MDBRow>
                    <h4><Link to="/create">Add Note</Link></h4>
                </MDBRow>
                <MDBRow>
                    {/*<MDBCol sm="4">*/}
                    {/*    <MDBCard style={{ width: "22rem", backgroundColor:"Pink" }} >*/}
                    {/*<MDBCardImage className="img-sm" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />*/}
                    {/*<MDBCardBody>*/}
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
                                this.state.notes.map(note =>
                                    <tr>
                                        <td>{note.date}</td>
                                        <td><Link to={`/show/${note.key}`}>{note.title}</Link></td>
                                        <td>{note.description}</td>
                                    </tr>
                                )}
                        </MDBTableBody>
                    </MDBTable>

                </MDBRow>
            </MDBContainer>
        );

    }
}

export default App;