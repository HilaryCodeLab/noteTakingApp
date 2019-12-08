import React, {Component} from 'react'
import firebase from "firebase";
import {MDBContainer, MDBIcon} from "mdbreact";
import Note from '../components/Note'
import cList from '../data/countries'




class SearchFilter extends Component{
   //initial state
    constructor(props){
        super(props);
        this.state={
            displayNotes: [],
            search:''

        };
    this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
    const dbRef = firebase.firestore().collection("notes");
    dbRef.get().then((querySnapshot) => {
        const db = [];
        querySnapshot.docs.forEach(document=>{
            let ss =document.data();
            console.log(ss);
            db.push(ss);
            console.log(querySnapshot);
        });
        this.setState({displayNotes:db});
    })
    }

onChange(e){
       let newSearch = e.target.value;
       this.setState({search:newSearch})
}
         render(){
            let search = this.state.search;
             let notes = this.state.displayNotes;
             let filteredNotes = notes.filter((note)=>{
                 return note.title.toString().toLowerCase().indexOf(search.toLowerCase())!==-1
             });

             return(
                 <MDBContainer>
                     <div className="active-pink-3 active-pink-4 mb-4">
                         <form className="form-inline mt-4 mb-4">
                             <MDBIcon icon="search"/>
                             <input className="form-control" type="text" placeholder="Search here" onChange={this.onChange}/>
                         </form>
                     </div>
                     <ul>
                         {
                             filteredNotes.map(note=>{
                                 return(
                                     <Note
                                        // key={note.id}
                                         title={note.title}
                                            description={note.description}
                                            type={note.type}
                                         key={`/show/${note.id}`}
                                     />
                                     )

                             })
                         }

                     </ul>

                 </MDBContainer>

             )
         }


}

export default SearchFilter;