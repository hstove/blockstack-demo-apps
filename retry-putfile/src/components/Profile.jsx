import React, { Component } from 'react';
import {
  isSignInPending,
  loadUserData,
  Person,
  putFile
} from 'blockstack';
import { setLocalGaiaHubConnection } from 'blockstack/lib/storage/hub';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

const gaiaConfigKey = 'blockstack-gaia-hub-config'

export default class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  person: {
  	  	name() {
          return 'Anonymous';
        },
  	  	avatarUrl() {
  	  	  return avatarFallbackImage;
  	  	},
  	  },
  	};
  }

  async corruptGaiaConfig() {
    console.debug('Setting Gaia config...')
    await setLocalGaiaHubConnection();
    const configJSON = JSON.parse(localStorage.getItem(gaiaConfigKey))
    console.debug('Got Gaia config token:', configJSON.token)
    configJSON.token = 'v1:asdf'
    console.debug('Corrupting Gaia config token')
    localStorage.setItem(gaiaConfigKey, JSON.stringify(configJSON))
  }

  async putFile() {
    const configJSON = JSON.parse(localStorage.getItem(gaiaConfigKey))
    console.debug('Current Gaia config token:', configJSON.token)
    console.debug('Saving file...')
    await putFile('test.json', JSON.stringify({ test: true }), { encrypt: false })
  }

  async putFileSigned() {
    const configJSON = JSON.parse(localStorage.getItem(gaiaConfigKey))
    console.debug('Current Gaia config token:', configJSON.token)
    console.debug('Saving file...')
    await putFile('test.json', JSON.stringify({ test: true }), { encrypt: false, sign: true })
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    return (
      !isSignInPending() ?
      <div className="panel-welcome" id="section-2">
        <div className="avatar-section">
          <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } className="img-rounded avatar" id="avatar-image" />
        </div>
        <h1>Hello, <span id="heading-name">{ person.name() ? person.name() : 'Nameless Person' }</span>!</h1>
        <p className="lead">
          <button
            className="btn btn-primary btn-lg"
            id="signout-button"
            onClick={ handleSignOut.bind(this) }
          >
            Logout
          </button>
        </p>
        <p className="lead">
          <button
            className="btn btn-primary btn-lg"
            id="signout-button"
            onClick={this.corruptGaiaConfig}
          >
            Corrupt local Gaia config
          </button>
        </p>
        <p className="lead">
          <button
            className="btn btn-primary btn-lg"
            id="signout-button"
            onClick={this.putFile}
          >
            putFile
          </button>
        </p>
        <p className="lead">
          <button
            className="btn btn-primary btn-lg"
            id="signout-button"
            onClick={this.putFileSigned}
          >
            putFile (signed, unencrypted)
          </button>
        </p>
      </div> : null
    );
  }

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
    });
  }
}
