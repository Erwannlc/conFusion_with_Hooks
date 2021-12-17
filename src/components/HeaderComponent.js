import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';


class Header extends Component {
    render () {
        return(
            // <React.Fragment></React.Fragment> équivaut à <> </>, signifie l'éuivalent d'une div enrobant des éléments React sans ajouter de noeud DOM supplémentaire. 
            <>
           <Navbar dark>
            <div className="container">
                <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
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