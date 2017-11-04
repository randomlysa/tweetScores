import { combineReducers } from 'redux';
import ScoreReducer from './reducer_scoreAndTeamName';

const rootReducer = combineReducers({
  teamsAndScores: ScoreReducer
});

export default rootReducer;
