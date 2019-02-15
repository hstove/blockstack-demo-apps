import React, { Component } from 'react';
import {
  isSignInPending,
  isUserSignedIn,
  handlePendingSignIn,
  signUserOut,
  makeAuthRequest,
  redirectToSignInWithAuthRequest
} from 'blockstack';

// const url = 'https://deploy-preview-1723--reporter-beaver-73821.netlify.com/auth?authRequest='
const url = 'http://localhost:3000/auth?authRequest='
// const url = 'blockstack:'

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendedGaiaHubUrl: "https://hub.blockstack.org"
    }
  }

  handleSignIn(e) {
    e.preventDefault();
    const authRequest = makeAuthRequest(undefined, undefined, undefined, undefined, undefined, undefined, {
      solicitGaiaHubUrl: true,
      // recommendedGaiaHubUrl: 'http://localhost:4242'
    })
    redirectToSignInWithAuthRequest(authRequest)
    // window.location = `${url}${authRequest}`
  }

  recommendedSignIn(e) {
    e.preventDefault();
    const authRequest = makeAuthRequest(undefined, undefined, undefined, undefined, undefined, undefined, {
      solicitGaiaHubUrl: true,
      recommendedGaiaHubUrl: this.state.recommendedGaiaHubUrl
    })
    redirectToSignInWithAuthRequest(authRequest)
    // window.location = `${url}${authRequest}`
  }

  render() {
    const { handleSignIn, recommendedSignIn } = this;

    return (
      <div className="panel-landing" id="section-1">
        <h1 className="landing-heading">Hello, Blockstack!</h1>
        <p className="lead">
          <button
            className="btn btn-primary btn-lg"
            id="signin-button"
            onClick={ handleSignIn.bind(this) }
          >
            Sign In (Solicit Gaia URL)
          </button>
          <br/>
          <span className="label">Recommended Gaia Hub URL:</span>
          <input 
            type="text"
            value={this.state.recommendedGaiaHubUrl} 
            onChange={(e) => this.setState({ recommendedGaiaHubUrl: e.target.value })}
          />
          <br />
          <button
            className="btn btn-primary btn-lg"
            id="signin-button"
            onClick={recommendedSignIn.bind(this) }
          >
            Sign In (Recommended Gaia URL)
          </button>
        </p>
      </div>
    );
  }
}
