import * as ActionsTypes from './ActionTypes';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionsTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
})