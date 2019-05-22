import React, { Component } from "react";
import synthlogo from "../synthlogo.png";

class Profile extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="card border-0 shadow my-5 home-container">
          <div className="card-body p-5">
            <br />
            <div>
              <img className="profile-pic" src="" alt={synthlogo} />
              <h1 className="font-weight-light">USER NAME</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
