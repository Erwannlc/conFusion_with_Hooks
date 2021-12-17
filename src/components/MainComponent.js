import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes'; 

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
        dishes: DISHES,
        selectedDish: null
    }; 
  }

  onDishSelect(dishId) {
      this.setState({selectedDish: dishId});
  }

  render () {
    return (
        <div>
            <Header />
            <Menu dishes={this.state.dishes}
            onClick={(dishId) => this.onDishSelect(dishId)} />
            {/* ligne de code du cours : <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/> */}
            <Dishdetail dish={this.state.dishes[this.state.selectedDish]}/>
            <Footer />

        </div>
    );
  }
}

export default Main;