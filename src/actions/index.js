import { loadState } from '../manageLocalStorage';

export const UPDATE_SCORE = 'UPDATE_SCORE';

export function updateScore(teamId, scoreUpdate) {
    return {
        type: UPDATE_SCORE,
        payload: {
            teamId: teamId,
            score: scoreUpdate
        }
    }
}
