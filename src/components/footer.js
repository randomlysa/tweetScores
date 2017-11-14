import React, { Component } from 'react';
import { clearStorage } from '../manageLocalStorage';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import $ from 'jquery';

class Footer extends Component {

    sendTweet(props) {
        const info = this.props.teamsAndScores;
        const tweet = `${info.homeTeamName}: ${info.homeScore} | ${info.awayTeamName}: ${info.awayScore}`;
        const clientid = this.props.teamsAndScores.twitterAuth;

        $.ajax({
            type: 'POST',
            url: 'http://code.randomlysa.com/tweetScores/php/tweet.php?clientid=' + clientid,
            data: {newTweet: tweet}
        }).then(function(data){
            console.log(data);
        }).catch(function(e){
            console.log(e);
        })
    }

    render(props) {
        const jsonLink = `http://code.randomlysa.com/tweetScores/php/jsonInfo.php?gameid=${this.props.teamsAndScores.gameid}`;

        if (this.props.teamsAndScores.twitterAuth) {
            return (
                <div className="footer div-center">
                    Authorized with Twitter. <br />
                    <button onClick={this.sendTweet.bind(this)}>Tweet Score</button><br />
                    <button onClick={clearStorage}>Delete all data</button>
                    <button onClick={this.props.actions.unauthTwitter}>remove twitter authorization</button>
                    <a href={jsonLink}>Game Info in JSON Format</a>
                </div>
            );
        } else {
            return (
                <div className="footer div-center">
                    <a href="http://code.randomlysa.com/tweetScores/php/twitterAuth.php">
                        <button>Authorize with Twitter.</button>
                    </a>
                    <button onClick={clearStorage}>Delete all data</button>
                    <a href={jsonLink}>Game Info in JSON Format</a>
                </div>
            );
        }
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
