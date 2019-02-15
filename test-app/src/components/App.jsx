import React, { Component, Link } from 'react';
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import {
  isSignInPending,
  isUserSignedIn,
  handlePendingSignIn,
  signUserOut,
  makeAuthRequest,
  redirectToSignInWithAuthRequest
} from 'blockstack';

export default class App extends Component {

  constructor(props) {
  	super(props);
  }

  handleSignIn(e) {
    e.preventDefault();
    const authRequest = makeAuthRequest(undefined, undefined, undefined, undefined, undefined, undefined, {
      solicitGaiaHubUrl: true,
      // recommendedGaiaHubUrl: 'http://localhost:4242'
    })
    redirectToSignInWithAuthRequest(authRequest)
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          { !isUserSignedIn() ?
            <Signin handleSignIn={ this.handleSignIn } />
            : <Profile handleSignOut={ this.handleSignOut } />
          }
        </div>
      </div>
    );
  }

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
  }
}
