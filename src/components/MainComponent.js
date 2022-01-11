import React, { useEffect } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postComment, postFeedback, fetchFeedbacks, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionsCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';



function Main () {

  const dishes = useSelector((state) => state.dishes)
  const comments = useSelector((state) => state.comments)
  const leaders = useSelector((state) => state.leaders)
  const promotions = useSelector((state) => state.promotions)
  // const feedbacks = useSelector((state) => state.feedbacks)

  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(fetchDishes());
    dispatch(fetchComments());
    dispatch(fetchPromos());
    dispatch(fetchLeaders());
    dispatch(fetchFeedbacks());
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
      
      
      return (
        <Dishdetail dish={dishes.dishes.find(dish => dish.id === parseInt(params.dishId,10))}
        isLoading={dishes.isLoading}
        errMess={dishes.errMess}
        comments={comments.comments.filter(comment => comment.dishId === parseInt(params.dishId,10))} 
        commentsErrMess={comments.errMess}
        postComment={(...comment) => dispatch(postComment(...comment))}
        />
      );
    };

    const location = useLocation();

    return (
      
        <div>
            <Header />
            <TransitionGroup> 
              <CSSTransition key={location.key} classNames="page" timeout={1000}>
                          
                <Routes > 
                  <Route path="/home" element={HomePage()} />
                  <Route path="/aboutus" element={<About leaders={leaders}/>} />
                  <Route exact path="/menu" element={<Menu dishes={dishes} />} />
                  <Route exact path="/menu/:dishId" element={<DishWithId />} /> 
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