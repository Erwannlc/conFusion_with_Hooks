import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { Feedbacks } from './feedbacks';
import { favorites } from './favorites'
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import { InitialFeedBack } from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            feedbacks: Feedbacks,
            auth: Auth,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}