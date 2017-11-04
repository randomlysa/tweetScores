import React, { Component } from 'react';

import TeamAndScore from './teamAndscore';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Live Tweet Scores</h1>
        <TeamAndScore teamId="home" />
        <TeamAndScore teamId="away" />
      </div>
    );
  }
}
