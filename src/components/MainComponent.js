import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes'; 
import { COMMENTS } from '../shared/comments'; 
import { LEADERS } from '../shared/leaders'; 
import { PROMOTIONS } from '../shared/promotions'; 
import { Routes, Route, Navigate } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
        dishes: DISHES,
        promotions: PROMOTIONS,
        comments: COMMENTS,
        leaders: LEADERS,
    }; 
  }

  render () {

    const HomePage = () => {
      return (
        // choose the dish wich featured: true
        <Home 
        dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
        leader={this.state.leaders.filter((leader) => leader.featured)[0]} 
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]} />
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
              <Route exact path="/contactus" element={<Contact />} />

              {/* replace Redirect with Navigate */}
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>

            <Footer />

        </div>
    );
  }
}

export default Main;
