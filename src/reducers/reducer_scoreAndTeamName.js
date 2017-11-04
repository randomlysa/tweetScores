import {
    UPDATE_SCORE,
    UPDATE_TEAM_NAME
} from '../actions/index';

import { loadState, saveState } from '../manageLocalStorage';
import $ from 'jquery';

let initialState;

// No state in local storage, use default.
if (!loadState()) {

    const gameid = Math.floor(Math.random()*123456799)

    initialState = {
        gameid: gameid,
        homeTeamName: 'Home Team',
        awayTeamName: 'Away Team',
        homeScore: 0,
        awayScore: 0
    }
// Otherwise use state from local storage.
} else {
    initialState = loadState();
}

export default function(state = initialState, action) {
    let newState;

    switch (action.type) {
        case UPDATE_SCORE:
            let homeScore = state.homeScore;
            let awayScore = state.awayScore;

            if (action.payload.teamId === "home") {
                let newHomeScore = homeScore + parseInt(action.payload.score);
                newState = { ...state, homeScore: newHomeScore };
            }

            if (action.payload.teamId === "away") {
                let newAwayScore = awayScore + parseInt(action.payload.score);
                newState = { ...state, awayScore: newAwayScore };
            }

            $.ajax({
                type: "POST",
                url: 'http://code.randomlysa.com/tweetScores/db.php',
                data: newState
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

            saveState(newState)
            return newState;

        case UPDATE_TEAM_NAME:
            if (action.payload.teamId === "home") {
                newState = { ...state, homeTeamName: action.payload.newTeamName }
            }
            if (action.payload.teamId === "away") {
                newState = { ...state, awayTeamName: action.payload.newTeamName }
            }

            saveState(newState)
            return newState;

        default:
            return state
    }

    return state;
}
