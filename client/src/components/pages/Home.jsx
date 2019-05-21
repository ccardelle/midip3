import React, { Component } from "react";
import TrackList from "./TrackList";
export default class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {
    return (
      <div className="container">
        <div className="card border-0 shadow my-5 home-container">
          <div className="card-body p-5">
            <h1 className="font-weight-light">You are HOME</h1>
            <br />
            <TrackList />

            <p className="lead">This is home, in case you didnt know.</p>
            <p className="lead">Scroll down...</p>
            <div style={{ height: 700 }} />
            <p className="lead mb-0">!!!!!!</p>
          </div>
        </div>
      </div>
    );
  }
}
