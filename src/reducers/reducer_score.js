import {
    UPDATE_SCORE
} from '../actions/index';

const initialState = {
    score: [ 0, 0 ]
}

export default function(state = initialState, action) {

    console.log("STATE", state)

    switch (action.type) {
        case UPDATE_SCORE:

            let homeScore = state.score[0];
            let awayScore = state.score[1];

            if (action.payload.teamId === "home") {
                let newHomeScore = homeScore + parseInt(action.payload.score);
                return Object.assign({}, state, {
                    score: [newHomeScore, awayScore]
                })
            }

            if (action.payload.teamId === "away") {
                let newAwayScore = awayScore + parseInt(action.payload.score);
                return Object.assign({}, state, {
                    score: [homeScore, newAwayScore]
                })
            }
        default:
            return state
    }

    return state;
}
