import React, { Component } from 'react';
import firebase from 'firebase'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user
      })
    })
    console.log(this.state.user);
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(result.user.email + ' ha iniciado sesion'))
      .catch(error => console.log('Error ' + error.code + ': ' + error.message))

  }

  handleLogout() {
    firebase.auth().signOut()
      .then(result => console.log(result.user.email + ' ha cerrado sesion'))
      .catch(error => console.log('Error ' + error.code + ': ' + error.message))
  }

  renderLoginButton() {
    if(this.state.user) {
      // Si esta Logueado
      return (
        <div>
          <img src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hola, {this.state.user.displayName}!</p>
          <button onClick={() => this.handleLogout()}>Salir</button>
        </div>
      )
    } else{
      // No esta Logueado
      return <button onClick={() => this.handleAuth()}>Login con Google</button>
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Bienvenido a React-Firebase</h2>
        </div>
        <p className="App-intro">
          { this.renderLoginButton() }
        </p>
      </div>
    );
  }
}

export default App;
