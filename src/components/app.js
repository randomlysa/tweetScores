import React, { Component } from 'react';

import TeamAndScore from './teamAndscore';
import Footer from './footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Live Tweet Scores</h1>
        <div className="group">
          <TeamAndScore teamId="home" />
          <TeamAndScore teamId="away" />
        </div>
        <Footer />
      </div>
    );
  }
}
