import React from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavItem,
    MDBNavLink,
    MDBIcon,
    MDBFormInline
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class NavBarPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    render() {
        const bgPink = {backgroundColor: '#e91e63'}
        const container = {height: 1300}
        return(
            <div>
                <Router>
                    <header>
                        <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="bottom">
                            <MDBNavbarToggler onClick={ this.onClick } />
                            <MDBCollapse isOpen = { this.state.collapse } navbar>
                                <MDBNavbarNav left>
                                    <MDBNavItem active>
                                        <MDBNavLink to="#">Home</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="#">Features</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="#">Pricing</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="#">Options</MDBNavLink>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                                <MDBNavbarNav right>
                                    {/*<MDBNavItem>*/}
                                    {/*    <MDBNavLink to="#"><MDBIcon fab icon="facebook-f" /></MDBNavLink>*/}
                                    {/*</MDBNavItem>*/}
                                    {/*<MDBNavItem>*/}
                                    {/*    <MDBNavLink to="#"><MDBIcon fab icon="twitter" /></MDBNavLink>*/}
                                    {/*</MDBNavItem>*/}
                                    {/*<MDBNavItem>*/}
                                    {/*    <MDBNavLink to="#"><MDBIcon icon="search" /></MDBNavLink>*/}
                                    {/*</MDBNavItem>*/}

                                    <MDBNavItem>
                                        <MDBFormInline waves>
                                            <div className="md-form my-0">
                                                 <MDBIcon icon="search"/>

                                                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                                            </div>
                                        </MDBFormInline>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBNavbar>
                    </header>
                </Router>

            </div>
        );
    }
}

export default NavBarPage;