import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button, Modal, ModalBody, ModalHeader,Form, FormGroup, Label, Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';


function Header () {
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleNav = () =>  setIsNavOpen(!isNavOpen)
    const toggleModal = () => setIsModalOpen(!isModalOpen)

    let username = "";
    let password = "";
    let remember = "";


    function handleLogin(event) {
        toggleModal()
        alert("Username: " + username.value + " Password: " + password + " Remember: " + remember.checked)
        event.preventDefault()
    }

    return(
        // <React.Fragment></React.Fragment> équivaut à <> </>, signifie l'éuivalent d'une div enrobant des éléments React sans ajouter de noeud DOM supplémentaire. 
        <>
        <Navbar dark expand="md">
        <div className="container">
            <NavbarToggler onClick={toggleNav} />
            
            <Collapse isOpen={isNavOpen} navbar>
            
            <Nav navbar>
                <NavbarBrand className="me-auto" href="/">
                <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante con Fusion" />
            </NavbarBrand>
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
                    <NavLink className="nav-link" to="/contactus">
                        <span className='fa fa-adress-card fa-lg'></span> Contact us
                    </NavLink>                    
                </NavItem>
            </Nav>
            <Nav className='ms-auto' navbar>
                <NavItem>
                    <Button outline onClick={toggleModal}><span className='fa fa-sign-in fa-lg'></span>
                        {' '} Login
                    </Button>
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
        <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Login</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleLogin}>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" id="username" name="username" 
                        innerRef={(input) => username=input} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password"
                            innerRef={(input) => password=input} />
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" name="remember" 
                            innerRef={(input) => remember=input}/>Remember me
                        </Label>
                    </FormGroup>
                    <Button type="submit" color='primary'>Login</Button>
                </Form>



            </ModalBody>
        </Modal>
        </>
    )
}

export default Header