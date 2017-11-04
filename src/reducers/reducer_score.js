import {
    UPDATE_SCORE
} from '../actions/index';

const initialState = {
    homeTeamName: '',
    awayTeamNme: '',
    homeScore: 0,
    awayScore: 0
}

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SCORE:

            let homeScore = state.homeScore;
            let awayScore = state.awayScore;

            if (action.payload.teamId === "home") {
                let newHomeScore = homeScore + parseInt(action.payload.score);
                return { ...state, homeScore: newHomeScore };
            }

            if (action.payload.teamId === "away") {
                let newAwayScore = awayScore + parseInt(action.payload.score);
                return { ...state, awayScore: newAwayScore };
            }
        default:
            return state
    }

    return state;
}
