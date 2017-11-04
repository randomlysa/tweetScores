import {
    UPDATE_SCORE,
    UPDATE_TEAM_NAME
} from '../actions/index';

const initialState = {
    homeTeamName: 'Home Team',
    awayTeamName: 'Away Team',
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

        case UPDATE_TEAM_NAME:
            if (action.payload.teamId === "home") {
                return { ...state, homeTeamName: action.payload.newTeamName }
            }
            if (action.payload.teamId === "away") {
                return { ...state, awayTeamName: action.payload.newTeamName }
            }

        default:
            return state
    }

    return state;
}
