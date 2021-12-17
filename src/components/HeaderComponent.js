import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
    } 

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })

    }
    render() {
        return(
            // <React.Fragment></React.Fragment> équivaut à <> </>, signifie l'éuivalent d'une div enrobant des éléments React sans ajouter de noeud DOM supplémentaire. 
            <>
           <Navbar dark expand="md">
            <div className="container">
                <NavbarToggler onClick={this.toggleNav} />
                <NavbarBrand className="mr-auto" href="/">
                    <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante con Fusion" />
                </NavbarBrand>
                <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink className="nav-link" to="/home">
                            <span className='fa fa-home fa-lg'></span> Home
                        </NavLink>                    
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/aboutus">
                            <span className='fa fa-info fa-lg'></span> About us
                        </NavLink>                    
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/menu">
                            <span className='fa fa-list fa-lg'></span> Menu
                        </NavLink>                    
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/contact">
                            <span className='fa fa-adress-card fa-lg'></span> Contact us
                        </NavLink>                    
                    </NavItem>
                </Nav>
                </Collapse>
            </div>
            </Navbar>
            <div className='jumbotron'>
                <div className="container">
                    <div className='row row-header'>
                        <div className='col-12 col-sm-6'>
                            <h1>Ristorante Con Fusion</h1>
                            <p>We take inspiration from the World's best cuisisnes, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary sens!</p>
                        </div>

                    </div>
                </div>
            </div>
            </>
        )
        
    }
}

export default Header