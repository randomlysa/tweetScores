import {
    UPDATE_SCORE
} from '../actions/index';


export default function(state = [], action) {
    switch (action.type) {
        case UPDATE_SCORE:
            return action.payload
    }
    return state;
}
