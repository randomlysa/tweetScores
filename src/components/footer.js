import React, { Component } from 'react';
import { clearStorage } from '../manageLocalStorage';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions'

class Footer extends Component {
    render(props) {

        console.log(this.props)

        return (
            <div className="footer div-center">
                <button onClick={clearStorage}>Delete all data</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
