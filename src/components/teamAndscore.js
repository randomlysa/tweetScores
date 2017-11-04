import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions'

class TeamAndScore extends Component {
  render(props) {

    let teamName = this.props.teamName;

    return (
    <div>
        <h2>{teamName}</h2>
        <h2>Score: </h2>

        <button
            onClick={this.props.actions.updateScore.bind(this, teamName, "+2")}
        >
            +2
        </button>

        <button
            onClick={this.props.actions.updateScore.bind(this, teamName, "+3")}
        >
            +3
        </button>

        <button
            onClick={this.props.actions.updateScore.bind(this, teamName, "+1")}
        >
            +1
        </button>

        <br />

        <button
            onClick={this.props.actions.updateScore.bind(this, teamName, "-1")}
        >
            -1
        </button>

        <button
            onClick={this.props.actions.updateScore.bind(this, teamName, "-2")}
        >
            -2
        </button>
    </div>
    );
  }
}

// Gets info from state.
function mapStateToProps({ score }) {
    return { score }; // same as { score: score}
}

function mapDispatchToProps(dispatch) {
    // Assign all actions (import * as actionCreators) to props.actions
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamAndScore)
