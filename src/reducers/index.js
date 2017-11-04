import { combineReducers } from 'redux';
import ScoreReducer from './reducer_score';

const rootReducer = combineReducers({
  teamsAndScores: ScoreReducer
});

export default rootReducer;
