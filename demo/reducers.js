// sample reducers
import { combineReducers } from 'redux';
//import { ACTION } from './actions';
const counters = (state = [0, 0, 0], action) => {
    switch (action.type) {
        /*
        case ACTION.IncrementCounter:
            return [
                ...state.slice(0, action.counterId),
                state[action.counterId] + 1,
                ...state.slice(action.counterId + 1),
            ];*/
        default:
            return state;
    }
};

export const demoApp = combineReducers({ counters });
