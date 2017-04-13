import React, { Component } from 'react';
import firebase from 'firebase'
import './App.css';
import FileUpload from './FileUpload'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      valueProgress: 0,
      pictures: []
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user
      })
    })
    
    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      })
    })

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

  handleUpload(event) {
      const file = event.target.files[0]
      const storageRef = firebase.storage().ref('/fotos/'+file.name)
      const task = storageRef.put(file)

      task.on('state_changed', (snapshot) => {
        let porcentaje = (snapshot.bytesTransferred / snapshot.TotalBytes) * 100
        this.setState({
          valueProgress: porcentaje
        })
      }, (error) => {
        console.log(error.message)
      }, () => {

        this.setState({
          valueProgress: 100
        })
        
        const record = {
          image: task.snapshot.downloadURL,
          photoURL: this.state.user.photoURL,
          displayName: this.state.user.displayName
        }

        const dbRef = firebase.database().ref('pictures')
        const newImage = dbRef.push()
        newImage.set(record)

      })

  }

  renderLoginButton() {
    if(this.state.user) {
      // Si esta Logueado
      return (
        <div>
          <img src={this.state.user.photoURL} alt={this.state.user.displayName} width="50" height="50" />
          <p>Hola, {this.state.user.displayName}!</p>
          <button onClick={() => this.handleLogout()}>Salir</button>
          <br/>
          <progress value={this.state.valueProgress} max="100"></progress>
          <FileUpload onUpload={(event) => this.handleUpload(event)} />

          {
            this.state.pictures.map((picture, key) => (
              <div key={key}>
                <img src={picture.image} alt="" width="200" height="200"/>
                <br/>
                <img src={picture.photoURL} alt="" width="50" height="50"/>
                <br/>
                <span>{picture.displayName}</span>
              </div>
            ))
          }

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
