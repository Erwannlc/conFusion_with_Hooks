import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionsCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});

class Main extends Component {

 
  render () {

    const HomePage = () => {

      const {dishes, leaders, promotions} = this.props

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
        <Dishdetail dish={this.props.dishes.find(dish => dish.id === parseInt(params.dishId,10))}
        comments={this.props.comments.filter(comment => comment.dishId === parseInt(params.dishId,10))} 
          addComment={this.props.addComment}
        />
      );
    };

    return (
        <div>
            <Header />
            {/* Switch devient Routes */}
            <Routes> 
              {/* dans Route, component devient element */}
              <Route path="/home" element={HomePage()} />
              <Route path="/aboutus" element={<About leaders={this.props.leaders}/>} />
              {/* component={() => <Menu dishes={this.state.dishes} />} devient element={<Menu dishes={this.state.dishes} />}  */}
              <Route exact path="/menu" element={<Menu dishes={this.props.dishes} />} />
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

// withRouter (from 'react-router-dom') est maintenant déprécié et inutile
export default connect(mapStateToProps, mapDispatchToProps)(Main);
