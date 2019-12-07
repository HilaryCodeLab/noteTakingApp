import firebase from '../Firebase.js';
import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {
    MDBBtn, MDBCardText,
    MDBContainer,
    MDBFormInline, MDBIcon,
    MDBInput,
    MDBRow
} from "mdbreact";



class Create extends Component{
    constructor(props) {
        super(props);
        this.ref= firebase.firestore().collection("notes");
        this.state={
            title:'',
            date:'',
            type:'',
            description:'',
            errors:{}

        };
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    handleValidation() {
        let formIsValid = true;
         let errors = this.state.errors;
        let {title,date,description,type} = this.state;
        if(!type){
            formIsValid = false;
            errors["type"] ="Please specify the type for your note!"
        }
        if(!date){
            formIsValid = false;
           errors["date"] = "You need a date!"
        }
        if(!title){
            formIsValid = false;
            errors["title"] = "A title will be great!"
        }
        if(!description){
            formIsValid = false;
            errors["description"] = "This can't be right!"
        }
        this.setState({errors:errors});
        return formIsValid
    };

    onSubmit = (e) => {
        e.preventDefault();
        e.target.className += " was-validated";
        console.log(this.state);
        if(this.handleValidation()) {
            const {title, date, description, type} = this.state;
            this.ref.add({
                title,
                date,
                description,
                type,
            })
                .then((docRef) => {
                    this.setState({
                        title: '',
                        date: '',
                        description: '',
                        type: ''
                    });
                    this.props.history.push("/");
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
        else{
            alert("Form has errors");
        }
    };
    render() {
        const {title,date,description,type,errors} = this.state;
         return(
            <MDBContainer>
                <h4>
                    <Link to="/">Home</Link>
                </h4>
                <form className="mx-3 grey-text needs-validation" noValidate onSubmit={this.onSubmit}>
                      <MDBInput ref="type" name="type" icon="candy-cane" value={type.value} type="text" onChange={this.onChange} required>
                          <div className="invalid-feedback" style={{textAlign:"center"}}>
                              <p>{errors["type"]}</p>
                          </div>
                      </MDBInput>
                    <MDBInput ref="date" name="date" icon="clock" value={date.value} type="date" onChange={this.onChange} required>
                        <div className="invalid-feedback" style={{textAlign:"center"}}>
                            <p>{errors["date"]}</p>
                        </div>
                    </MDBInput>
                    <MDBInput ref="title" name="title" icon="sticky-note" label="Title" value={title.value} type="text" onChange={this.onChange} required>
                        <div className="invalid-feedback"  style={{textAlign:"center"}}>
                               <p>{errors["title"]}</p>
                        </div>
                    </MDBInput>
                    <MDBInput ref="description" name="description" icon="pencil-alt" label="Description" value={description.value} type="textarea" onChange={this.onChange} required>
                        <div className="invalid-feedback"  style={{textAlign:"center"}}>
                            <p>{errors["description"]}</p>
                        </div>
                    </MDBInput>
                    <MDBBtn type="submit" color="secondary">Add</MDBBtn>
                </form>
            </MDBContainer>
        );
    };
}

export default Create;