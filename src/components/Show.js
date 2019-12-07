import React, {Component} from 'react';
import firebase from "../Firebase";
import {Link} from 'react-router-dom';
import Modal from "./Modal";

class Show extends Component{
    constructor(props){
        super(props);
        this.state = {
            notes:{},
            key:'',
            modalShowing: false
        };
    }
    modalClose = () =>{
        this.setState({modalShowing:false})
    };

    modalOpen = () =>{
        this.setState({modalShowing:true});
    };

    componentDidMount() {
        const ref = firebase.firestore().collection('notes').doc(this.props.match.params.id);
        ref.get().then((doc) =>{
            if(doc.exists){
                this.setState({
                    notes: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            } else{
                console.log("No such document!");
            }
        });
    }

    delete(id){
            firebase.firestore().collection('notes').doc(id).delete()
                .then(()=>{
                    console.log("Document successfully deleted");
                    this.props.history.push("/")
                }).catch((error)=>{
                console.log("Error removing document:",error);
            })
    }

    render() {
        return(
           <div className="container">
               <div className="panel panel-default">
                   <div className="panel-heading">
                       <h3><Link to="/"> Note List </Link></h3>
                       <h3 className="panel-title">
                           {this.state.notes.date}
                       </h3>
                   </div>
                   <div className="panel-body">
                       <dl>
                           <dt>Type:</dt>
                           <dd>{this.state.notes.type}</dd>
                           <dt>Title:</dt>
                           <dd>{this.state.notes.title}</dd>
                           <dt>Description:</dt>
                           <dd>{this.state.notes.description}</dd>

                       </dl>
                           <Link to={`/edit/${this.state.key}`} className="btn btn-outline-secondary">Edit</Link>&nbsp;
                            <button onClick={this.modalOpen.bind(this)} className="btn btn-amber">Delete</button>
                            <button onClick={this.modalOpen} className="btn btn-danger">Test</button>
                            <Modal show={this.state.modalShowing} toggle={this.modalClose}
                                   delete={this.delete.bind(this, this.state.key)} close={this.modalClose}>
                                Are you sure to delete?
                            </Modal>
                   </div>
               </div>
           </div>
        );
    }
}

export default Show;