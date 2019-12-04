import React, {Component} from 'react'
import firebase from "firebase";
import {MDBContainer} from "mdbreact";
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
                     <input className="form-control" type="text" placeholder="Search here" onChange={this.onChange}/>
                     <ul>
                         {
                             filteredNotes.map(note=>{
                                 return(
                                     <Note
                                        key={note.id}
                                         title={note.title}
                                            description={note.description}
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