import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes'; 
import { Routes, Route, Navigate } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
        dishes: DISHES,
    }; 
  }

  render () {

    const HomePage = () => {
      return (
        <Home />
      )
      
    }
    return (
        <div>
            <Header />
            {/* Switch devient Routes */}
            <Routes> 
              {/* dans Route, component devient element */}
              <Route path="/home" element={HomePage()} />
              {/* component={() => <Menu dishes={this.state.dishes} />} devient element={<Menu dishes={this.state.dishes} />}  */}
              <Route exact path="/menu" element={<Menu dishes={this.state.dishes} />} />
              {/* replace Redirect with Navigate */}
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>

            <Footer />

        </div>
    );
  }
}

export default Main;
