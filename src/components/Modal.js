import React, {Component} from 'react';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";

class Modal extends Component{
    // constructor(props){
    //     super(props)
    // }
    render() {
        return(
            <MDBContainer>
                <MDBModal isOpen={this.props.show} toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.props.toggle}> Confirm </MDBModalHeader>
                    <MDBModalBody>
                        <p>{this.props.children}</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="primary" onClick={this.props.delete}>Yes</MDBBtn>
                        <MDBBtn color="secondary" onClick={this.props.close}>No</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    }
}

export default Modal;