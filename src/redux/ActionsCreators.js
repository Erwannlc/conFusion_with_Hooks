import * as ActionsTypes from './ActionTypes';
import { baseUrl } from "../shared/baseUrl";

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionsTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(baseUrl + 'dishes')
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)));
}

export const dishesLoading = () => ({
    type: ActionsTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionsTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionsTypes.ADD_DISHES,
    payload: dishes
})


export const fetchComments = () => (dispatch) => {
        return fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
}

export const commentsFailed = (errmess) => ({
    type: ActionsTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionsTypes.ADD_COMMENTS,
    payload: comments
})



export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());

        return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
    type: ActionsTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionsTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionsTypes.ADD_PROMOS,
    payload: promos
})