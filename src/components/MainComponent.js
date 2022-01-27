import React, { useEffect } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Favorites from './FavoriteComponent';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postComment, postFeedback, fetchFeedbacks, fetchDishes, fetchComments, fetchPromos, fetchLeaders, loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite  } from '../redux/ActionsCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';



function Main () {

  const dishes = useSelector((state) => state.dishes)
  const comments = useSelector((state) => state.comments)
  const leaders = useSelector((state) => state.leaders)
  const promotions = useSelector((state) => state.promotions)
  const favorites = useSelector((state) => state.favorites)
  const auth = useSelector((state) => state.auth)
  // const feedbacks = useSelector((state) => state.feedbacks)

  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(fetchDishes());
    dispatch(fetchComments());
    dispatch(fetchPromos());
    dispatch(fetchLeaders());
    dispatch(fetchFavorites());
    // dispatch(fetchFeedbacks());

  }, [dispatch])
      
  const HomePage = () => {
      return (
        // choose the dish wich featured: true 
        <Home 
        dish={dishes.dishes.find((dish) => dish.featured)} 
        dishesLoading={dishes.isLoading}
        dishesErrMess={dishes.errMess}
        promotion={promotions.promotions.find((promo) => promo.featured)} 
        promosLoading={promotions.isLoading}
        promosErrMess={promotions.errMess}
        leader={leaders.leaders.find((leader) => leader.featured)} 
        leadersLoading={leaders.isLoading}
        leadersErrMess={leaders.errMess}/>
      ) 
    }     

    const DishWithId = () => {
      let params = useParams();
      let favHandling = favorites.favorites ? favorites.favorites.dishes.some((dish) => dish._id === params.dishId) : false;
      console.log(params.dishId);
      console.log(dishes.dishes.filter(dish => dish._id === params.dishId ));

      return (
        auth.isAuthenticated ?
        <Dishdetail 
        dish={dishes.dishes.find((dish) => dish._id === params.dishId)}
        isLoading={dishes.isLoading}
        errMess={dishes.errMess}
        comments={comments.comments.filter(comment => comment.dish === params.dishId)} 
        commentsErrMess={comments.errMess}
        postComment={(...comment) => dispatch(postComment(...comment))}
        favorite={favHandling}
        postFavorite={(dishId) => dispatch(postFavorite(dishId))}
        />
        :
        <Dishdetail dish={dishes.dishes.find(dish => dish._id === params.dishId)}
        isLoading={dishes.isLoading}
        errMess={dishes.errMess}
        comments={comments.comments.filter(comment => comment.dish === params.dishId)} 
        commentsErrMess={comments.errMess}
        postComment={(...comment) => dispatch(postComment(...comment))}
        favorite={false}
        postFavorite={(dishId) => dispatch(postFavorite(dishId))}
        />
      );
    };

    const location = useLocation();

    // const PrivateRoute = ({ component: Component, ...rest }) => (
    //   <Route {...rest} render={(props) => (
    //     auth.isAuthenticated
    //       ? <Component {...props} />
    //       :  <Route path="*" element={<Navigate to="/home" />} />
    //   )} />
    // );

    return (
      
        <div>
            <Header auth={auth}
            loginUser={(...creds) => dispatch(loginUser(...creds))}
            logoutUser={() => dispatch(logoutUser())}/>

            <TransitionGroup> 
              <CSSTransition key={location.key} timeout={400} classNames="page">
                          
                <Routes > 
                  <Route path="/home" element={HomePage()} />
                  <Route path="/aboutus" element={<About leaders={leaders}/>} />
                  <Route exact path="/menu" element={<Menu dishes={dishes} />} />
                  <Route exact path="/menu/:dishId" element={<DishWithId />} />
                  <Route exact path="/favorites" element={<Favorites favorites={favorites} deleteFavorite={(dishId) => dispatch(deleteFavorite(dishId))} />} /> 
                  <Route exact path="/contactus" element={<Contact 
                  postFeedback={(...feedback) => dispatch(postFeedback(...feedback))} 
                  // feedback={JSON.stringify(this.props.feedbacks.feedbacks[this.props.feedbacks.feedbacks.length - 1])} 
                  />} />
                  <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
              </CSSTransition>
            </TransitionGroup>

            <Footer />

        </div>
    );
  
}

export default Main;