import React, { Component, Link } from 'react';
import { decodeToken } from 'jsontokens'
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
  loadUserData
} from 'blockstack';

export default class App extends Component {

  constructor(props) {
  	super(props);
  }

  handleSignIn(e) {
    e.preventDefault();
    redirectToSignIn(window.location.origin, `${window.location.origin}/manifest.json`, ['store_write', 'publish_data']);
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
        document.location = document.location.origin
      });
    } else if (isUserSignedIn()) {
      this.debugToken()

    }
  }

  debugToken() {
    const user = loadUserData();
    console.log(user)
    const { authResponseToken } = user;
    const token = decodeToken(authResponseToken);
    console.log(token.payload)
  }
}
