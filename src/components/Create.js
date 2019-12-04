import firebase from '../Firebase.js';
import React, {Component, useState} from "react";
import {Link} from 'react-router-dom';
import {MDBBtn, MDBContainer, MDBInput, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import Modal from './Modal';


class Create extends Component{
    constructor(props) {
        super(props);
        this.ref= firebase.firestore().collection("notes");
        this.state={
            title:'',
            date:'',
            description:'',
            isShowing: false
        };
    }

    openModalHandler = () => {
        this.setState({isShowing: true});
    };

    closeModalHandler = () => {
        this.setState({isShowing: false});
    };

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const {title,date,description} = this.state;

        this.ref.add({
            title,
            date,
            description
        }).then((docRef)=>{
            this.setState({
                title:'',
                date:'',
                description:''
            });

            this.props.history.push("/");
        })
            .catch((error)=>{
                console.error("Error adding document: ", error);
            });

    };

    render() {
        const {title,date,description} = this.state;
         return(
            <MDBContainer>
                { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop">Test</div> : null }

                <button className="open-modal-btn" onClick={this.openModalHandler}>Open Modal</button>

                <Modal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>
                    Maybe aircrafts fly very high because they don't want to be seen in plane sight?
                </Modal>
                <h4>
                    <Link to="/">Home</Link>
                </h4>
                <form onSubmit={this.onSubmit} className="mx-3 grey-text">
                    <MDBInput name="date" icon="clock" label="Date" getValue={date} type="date" hint="Date" onChange={this.onChange} group/>
                    <MDBInput name="title" icon="sticky-note" label="Title" getValue={title} type="text" hint="Title" onChange={this.onChange}  group/>
                    <MDBInput name="description" icon="pencil-alt" label="Description" getValue={description} type="textarea" hint="Description" onChange={this.onChange} group/>
                    <MDBBtn type="submit" color="secondary">Add</MDBBtn>
                </form>
            </MDBContainer>
        );
    };
}

export default Create;