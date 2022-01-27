import * as ActionsTypes from './ActionTypes';
import { baseUrl } from "../shared/baseUrl";


/*****************************  Dishes *****************************/

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
                let error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;

        }
    }, 
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)))
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
});



/*****************************  Comments *****************************/

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
                const error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
        }
    }, 
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = (errmess) => ({
    type: ActionsTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionsTypes.ADD_COMMENTS,
    payload: comments
})

/* Comment post & add */ 

export const addComment = (comment) => ({
    type: ActionsTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
             let error = new Error('Error' + response.status + ': ' + response.statusText)
             error.response = response;
             throw error;
        }
    }, 
    /* Quand on ne reçoit aucune info du serveur, qd le serveur ne répond pas du tout : */
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => { console.log('Post comments', error.message) 
        alert('Your comment could not be posted\nError: ' + error.message)})
};


/*****************************  Promos ****************************/

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
                let error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;

        }
    }, 
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)))
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



/******************  Leaders *************************/

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
                let error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
        }
    },
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
    type: ActionsTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionsTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionsTypes.ADD_LEADERS,
    payload: leaders
})

/*****************************  Feedback post add & get - contact form *****************************/



export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
    const newFeedback = { 
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message, 
    }

    newFeedback.date = new Date().toISOString();
// export const postFeedback = (feedback) => (dispatch) => {

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        // body: JSON.stringify(feedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
             const error = new Error('Error' + response.status + ': ' + response.statusText)
             error.response = response;
             throw error;
        }
    }, 
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => dispatch(addFeedback(response)))
    .then(response => alert(JSON.stringify(response)))
    .catch(error => { console.log('Post feedback', error.message) 
        alert('Your feedback could not be posted\nError: ' + error.message)})
    // .then(response => { console.log('Feedback', response); alert('Thank you for your feedback!\n'+JSON.stringify(response)); })
    // .catch(error =>  { console.log('Feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};

export const addFeedback = (feedback) => ({
    type: ActionsTypes.ADD_FEEDBACK,
    payload: feedback
});

export const fetchFeedbacks = () => (dispatch) => {
    return fetch(baseUrl + 'feedbacks')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
             let error = new Error('Error' + response.status + ': ' + response.statusText)
             error.response = response;
             throw error;

        }
    }, 
    /* Quand on ne reçoit aucune info du serveur, qd le serveur ne rpéond pas du tout : */
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(feedbacks => dispatch(addFeedbacks(feedbacks)))
    .catch(error => dispatch(feedbacksFailed(error.message)))
};

export const feedbacksFailed = (errmess) => ({
type: ActionsTypes.FEEDBACKS_FAILED,
payload: errmess
});

export const addFeedbacks = (feedbacks) => ({
type: ActionsTypes.ADD_FEEDBACKS,
payload: feedbacks
});

/********************************** Favorites *****************************************/

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

        return fetch(baseUrl + 'favorites', {
            headers: {
                'Authorization': bearer
            },
        })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                 const error = new Error('Error' + response.status + ': ' + response.statusText)
                 error.response = response;
                 throw error;
            }
        }, 
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(favorites => dispatch(addFavorites(favorites)))
        .catch(error => dispatch(favoritesFailed(error.message)))
}

export const postFavorite = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: "POST",
        body: JSON.stringify({"_id": dishId}),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favorites => { console.log('Favorite Added', favorites); dispatch(addFavorites(favorites)); })
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + dishId, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favorites => { console.log('Favorite Deleted', favorites); dispatch(addFavorites(favorites)); })
    .catch(error => dispatch(favoritesFailed(error.message)));
};



export const favoritesLoading = () => ({
    type: ActionsTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionsTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionsTypes.ADD_FAVORITES,
    payload: favorites
});

/* ********************************* LogIn LogOut **************************************** */


export const requestLogin = (creds) => {
    return {
        type: ActionsTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionsTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionsTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionsTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionsTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}