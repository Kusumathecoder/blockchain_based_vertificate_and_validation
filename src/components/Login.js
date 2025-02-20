import React, { Component } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "../Login.css"; // Import the Login CSS
import web3 from "../web3"; // Import web3 instance

class Login extends Component {
  state = {
    username: "",
    password: "",
    account: "",
    errorMessage: "",
    loading: false,
    loggedIn: false
  };

  handleLogin = async () => {
    const { username, password } = this.state;

    // Traditional username/password authentication
    if (!username || !password) {
      this.setState({ errorMessage: "Username and password are required" });
      return;
    }

    if (username !== "user" || password !== "password") {
      this.setState({ errorMessage: "Invalid username or password" });
      return;
    }

    this.setState({ loading: true, errorMessage: "" });

    // Request Ethereum wallet connection
    try {
      if (!window.ethereum) {
        throw new Error("Ethereum wallet is not installed.");
      }
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();

      if (accounts.length === 0) {
        throw new Error("No Ethereum account found.");
      }

      // Successful login
      this.setState({ account: accounts[0], loggedIn: true });
      this.props.onLogin();
    } catch (error) {
      this.setState({ errorMessage: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { errorMessage, loading, loggedIn } = this.state;

    if (loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-page">
        <div className="login-form-container">
          <h2>Login to DigitalBlock</h2>
          <Form>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="input-box">Username</Form.Label>
              <div className="input-container">
              <i className="fas fa-user"></i>
                <Form.Control
                  type="text"
                  className="input"
                  placeholder="Enter your username"
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
               
              </div>
             
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="input-box">Password</Form.Label>
              <div className="input-container">
                <i className="fas fa-lock"></i>
                <Form.Control
                  type="password"
                  className="input"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
            </Form.Group>
            <div className="remember-forget">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forget password</a>
            </div>

            <Button
              variant="primary"
              onClick={this.handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <div className="register-link">
              <p>
                Don't have an account? <a href="#">Register</a>
              </p>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
