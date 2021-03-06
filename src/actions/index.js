export const UPDATE_SCORE = "UPDATE_SCORE";
export const UPDATE_TEAM_NAME = "UPDATE_TEAM_NAME";
export const UNAUTH_TWITTER = "UNAUTH_TWITTER";
export const UPDATE_JSON = "UPDATE_JSON";

export function updateScore(teamId, scoreUpdate) {
  return {
    type: UPDATE_SCORE,
    payload: {
      teamId: teamId,
      score: scoreUpdate
    }
  };
}

export function updateTeamName(teamId, newTeamName) {
  return {
    type: UPDATE_TEAM_NAME,
    payload: {
      teamId: teamId,
      newTeamName: newTeamName
    }
  };
}

export function unauthTwitter() {
  return {
    type: UNAUTH_TWITTER
  };
}

export function updateJSON() {
  return {
    type: UPDATE_JSON
  };
}
