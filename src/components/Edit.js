import React, {Component} from 'react';
import firebase from '../Firebase';
import {Link} from 'react-router-dom';
import {MDBBtn, MDBInput} from "mdbreact";

class Edit extends Component{
    constructor(props){
        super(props);
        this.state ={
            key:'',
            date:'',
            title:'',
            description:''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('notes').doc(this.props.match.params.id);
        ref.get().then((doc)=>{
            if(doc.exists){
                const note = doc.data();
                this.setState({
                    key:doc.id,
                    date:note.date,
                    title:note.title,
                    description:note.description
                });
            }else{
                console.log("No such document!");
            }
        });
    }
 onChange = (e) => {
     const state = this.state;
     state[e.target.name]=[e.target.value];
     this.setState({notes:state});
 };

  onSubmit = (e) => {
        e.preventDefault();
        const{title,date,description}=this.state;
        const updateRef = firebase.firestore().collection('notes').doc(this.state.key);
        updateRef.set({
            title,
            date,
            description
        }).then((docRef)=>{
            this.setState({
                key:'',
                date:'',
                description:'',
                title:''
            });
            this.props.history.push("/show/" + this.props.match.params.id )
        })
            .catch((error)=>{
                console.error("Error adding document: " , error);
            });
  }

  render() {
      return(
          <div className="container">
              <div className="panel panel-default">
                  <div className="panel-heading">
                      <h3 className="panel-title">Edit Note</h3>
                  </div>
                  <div className="panel-body">
                      <h4><Link to={`/show/${this.state.key}`} className="btn btn-info"
                      >Note List</Link></h4>
                      <form onSubmit={this.onSubmit}>
                          <div className="form-group">
                              <label htmlFor="author">Date:</label>
                              <input type="text" className="form-control" name="date" value={this.state.date}
                                     onChange={this.onChange} placeholder="date"/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="title">Title:</label>
                              <input type="text" className="form-control" name="title" value={this.state.title}
                                     onChange={this.onChange} placeholder="Title"/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="description">Description:</label>
                              <input type="text" className="form-control" name="description"
                                     value={this.state.description} onChange={this.onChange} placeholder="Description"/>
                          </div>

                          <button type="submit" className="btn btn-success">Submit</button>

                          {/*<MDBInput name="date" icon="clock" label="Date" getValue={this.state.date} type="date" hint="Date" onChange={this.onChange} group/>*/}
                          {/*<MDBInput name="title" icon="sticky-note" label="Title" getValue={this.state.title} type="text" hint="Title" onChange={this.onChange}  group/>*/}
                          {/*<MDBInput name="description" icon="pencil-alt" label="Description" getValue={this.state.description} type="textarea" hint="Description" onChange={this.onChange} group/>*/}
                          {/*<MDBBtn type="submit" className="btn btn-blue-grey">Change</MDBBtn>*/}
                      </form>
                  </div>
              </div>
          </div>
      )
  }
}
export default Edit;

