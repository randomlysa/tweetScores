import { loadState } from '../manageLocalStorage';

export const UPDATE_SCORE = 'UPDATE_SCORE';

export function updateScore(team, scoreUpdate) {
    console.log(team, scoreUpdate, "action")

    return {
        type: UPDATE_SCORE,
        payload: {
            team: team,
            score: scoreUpdate
        }
    }
}
