import * as ActionTypes from './ActionTypes';


export const Feedbacks = (state = {
    errMess: null,
    feedbacks: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FEEDBACKS:
            return {...state, isLoading: false, errMess: null, feedbacks: action.payload};
        
        case ActionTypes.FEEDBACKS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feedbacks: []};

        case ActionTypes.ADD_FEEDBACK:
            let feedback = action.payload;
            return {...state, comments: state.feedbacks.concat(feedback)};

        default:
            return state;
    }
}