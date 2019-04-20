/*
ArtXperience Component
LoginModal
*/
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'Layout';
import './LoginModal.css';
import history from 'History';
import axios from 'axios';

class LoginModal extends Component {
  constructor(props) {
    super(props);
  }

  state = { 
    auth: this.props.auth ? this.props.auth : null,
    username: ""
  }

  componentDidMount() { }

  static getDerivedStateFromProps(nextProps, prevState) {
    let state = { };
    if (prevState) {
      for (let key in nextProps) {
        if (prevState.hasOwnProperty(key)) {
          if (nextProps[key] !== prevState[key])
            state[key] = nextProps[key];
        }
      }
    }
    
    return state;
  }

  handleSignIn = (e) => {
    e.preventDefault();
    const { auth, username } = this.state;
    let password = e.target.password.value;
    if (username != "" && password != "") {
      axios.post(`${location.protocol}//${location.hostname}:${location.port}/api/`, 
        { username: username, password: password })
      .then((response) => {
        console.log(response);
        if (response.data._id)
          this.props.setLoginState({ user_data: response.data }, () => {
            history.replace("/admin");
            this.props.toggle();
          });
      });
    }
  }

  render() {
    const { id, className, children, style, show, toggle, Header } = this.props;
    const { username } = this.state;
    return (
      <Modal id={"login-modal"} show={show} toggle={toggle}>
        <form method="POST" onSubmit={this.handleSignIn}>
          <ModalHeader>
            <h2>{ Header ? Header : "Sign In" }</h2>
          </ModalHeader>
          
          <ModalBody className="d-flex">
            <FormGroup id="username-input">
              <label>Username</label>
              <input id="username" name="username" type="text" value={username} onChange={(e) => { this.setState({ username: e.target.value }) }}/>
            </FormGroup>
            <FormGroup id="password-input">
              <label>Password</label>
              <input id="password" name="password" type="password"/>
            </FormGroup>
          </ModalBody>
          
          <ModalFooter>
            <button className="sign-in" type="submit">Sign In</button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export { LoginModal };