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
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionsCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())}
});

class Main extends Component {

 componentDidMount() {
  this.props.fetchDishes();
  this.props.fetchComments();
  this.props.fetchPromos();

 }

  render () {

    const HomePage = () => {

      const {dishes, leaders, promotions} = this.props

      return (
        // choose the dish wich featured: true 
        <Home 
        dish={dishes.dishes.find((dish) => dish.featured)} 
        dishesLoading={dishes.isLoading}
        dishesErrMess={dishes.errMess}
        promotion={promotions.promotions.find((promo) => promo.featured)} 
        promosLoading={promotions.isLoading}
        promosErrMess={promotions.errMess}
        leader={leaders.find((leader) => leader.featured)} />
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
        <Dishdetail dish={this.props.dishes.dishes.find(dish => dish.id === parseInt(params.dishId,10))}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter(comment => comment.dishId === parseInt(params.dishId,10))} 
        commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
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
