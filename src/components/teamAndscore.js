import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";

class TeamAndScore extends Component {
  constructor(props) {
    super(props);

    this.updateTeamName = this.updateTeamName.bind(this);
    // https://stackoverflow.com/a/44212683
    this.timeout = 0;
  }

  updateTeamName = e => {
    this.props.actions.updateTeamName(this.props.teamId, e.target.value);

    if (this.timeout) clearTimeout(this.timeout);

    // Node server couldn't handle being updated on every keypress for a teamname.
    this.timeout = setTimeout(() => {
      // Update team names, user has stopped typing for x ms.
      this.props.actions.updateJSON();
    }, 2000);
  };

  componentDidMount() {}

  render(props) {
    let teamName = this.props.teamName;
    let teamId = this.props.teamId;
    let tabIndex;

    let score;
    if (teamId === "home") {
      teamName = this.props.teamsAndScores.homeTeamName;
      score = this.props.teamsAndScores.homeScore;
      tabIndex = 1;
    } else {
      teamName = this.props.teamsAndScores.awayTeamName;
      score = this.props.teamsAndScores.awayScore;
      tabIndex = 2;
    }

    const mainDivClass = `${teamId} half-width`;

    return (
      <div className={mainDivClass}>
        <h2>
          <input
            type="text"
            value={teamName}
            id={teamId}
            onChange={this.updateTeamName}
            tabIndex={tabIndex}
          />
        </h2>
        <h2>Score: {score}</h2>

        <button
          onClick={this.props.actions.updateScore.bind(this, teamId, "+2")}
        >
          +2
        </button>

        <button
          onClick={this.props.actions.updateScore.bind(this, teamId, "+3")}
        >
          +3
        </button>

        <button
          onClick={this.props.actions.updateScore.bind(this, teamId, "+1")}
        >
          +1
        </button>

        <br />

        <button
          onClick={this.props.actions.updateScore.bind(this, teamId, "-1")}
        >
          -1
        </button>

        <button
          onClick={this.props.actions.updateScore.bind(this, teamId, "-2")}
        >
          -2
        </button>
      </div>
    );
  }
}

// Gets info from state.
function mapStateToProps({ teamsAndScores }) {
  // Should be same as reducer.
  return { teamsAndScores };
}

function mapDispatchToProps(dispatch) {
  // Assign all actions (import * as actionCreators) to props.actions
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamAndScore);
