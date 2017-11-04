import { loadState } from '../manageLocalStorage';

export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_TEAM_NAME = 'UPDATE_TEAM_NAME';

export function updateScore(teamId, scoreUpdate) {
    return {
        type: UPDATE_SCORE,
        payload: {
            teamId: teamId,
            score: scoreUpdate
        }
    }
}

export function updateTeamName(teamId, newTeamName) {
    console.log(teamId, newTeamName)
    return {
        type: UPDATE_TEAM_NAME,
        payload: {
            teamId: teamId,
            newTeamName: newTeamName
        }
    }
}
