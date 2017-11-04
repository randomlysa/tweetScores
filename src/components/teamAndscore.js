import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions'

class TeamAndScore extends Component {

    componentDidMount() {
    }

    render(props) {

        let teamName = this.props.teamName;
        let teamId = this.props.teamId;

        let score;
        if (teamId === 'home') {
            score = this.props.teamsAndScores.homeScore;
        } else {
            score = this.props.teamsAndScores.awayScore;
        }

        return (
            <div>
                <h2>{teamName}</h2>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamAndScore)
