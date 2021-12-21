import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes'; 
import { COMMENTS } from '../shared/comments'; 
import { LEADERS } from '../shared/leaders'; 
import { PROMOTIONS } from '../shared/promotions'; 
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

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

      const {dishes, leaders, promotions} = this.state

      return (
        // choose the dish wich featured: true 
        <Home 
        dish={dishes.find((dish) => dish.featured)} 
        leader={leaders.find((leader) => leader.featured)} 
        promotion={promotions.find((promo) => promo.featured)} />
      )
      
    }
    // La version originale (du prof) avec l'ancien React router :
    //
        // const DishWithId = ({match}) => {
        //   return(
        //       <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        //         comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
        //   );
        // };

      // Ma version avec useParams() :
    //
    // const DishWithId = () => {
    //   let params = useParams();
    //   return (
    //     <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(params.dishId,10))[0]}
    //     comments={this.state.comments.filter((comment) => comment.dishId === parseInt(params.dishId,10))} />
    //   );
    // };

      // Ma version alternative avec useParams() et .find() à la place de .filter() pour dish :
    //
    const DishWithId = () => {
      let params = useParams();
      return (
        <Dishdetail dish={this.state.dishes.find(dish => dish.id === parseInt(params.dishId,10))}
        comments={this.state.comments.filter(comment => comment.dishId === parseInt(params.dishId,10))} />
      );
    };

    return (
        <div>
            <Header />
            {/* Switch devient Routes */}
            <Routes> 
              {/* dans Route, component devient element */}
              <Route path="/home" element={HomePage()} />
              <Route path="/aboutus" element={<About leaders={this.state.leaders}/>} />
              {/* component={() => <Menu dishes={this.state.dishes} />} devient element={<Menu dishes={this.state.dishes} />}  */}
              <Route exact path="/menu" element={<Menu dishes={this.state.dishes} />} />
              <Route exact path="/menu/:dishId" element={<DishWithId />} /> 
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
