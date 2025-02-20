import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import web3 from "./web3.js";
import "./App.css";
import Navhead from "./components/navbar";
import Forms from "./components/form";
import Getcert from "./components/getcert";
import Reg from "./components/reg";
import Intro from "./components/intro";
import certcontract from "./config.js";
import Certificate from "./components/certificate";
import Login from "./components/Login"; 

class App extends Component {
  state = {
    account: "",
    name: "",
    course: "",
    txh: "",
    id: "",
    output: [],
    tofound: false,
    isAuthenticated: false, // Track authentication status
  };

  componentDidMount() {
    console.log("mounted");
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
    console.log(accounts);
    console.log("acc", accounts[0]);
    this.setState({ account: accounts[0] });
  }

  // Authentication check for protected routes
  requireAuth = (Component) => {
    if (!this.state.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return <Component />;
  };

  add = (data) => {
    var name = data.fname + " " + data.lname;
    certcontract.methods
      .addcert(name, data.course, data.email)
      .send(
        {
          from: this.state.account,
          gas: 500000,
        },
        (error, result) => {
          if (error) console.log("error " + error);
          else {
            this.setState({ name: data.fname + " " + data.lname });
            this.setState({ course: data.course + " " + "course" });
            this.setState({ txh: result });
            console.log(result);
            certcontract.methods
              .getid()
              .call({ from: this.state.account }, (error, result) => {
                this.setState({ id: result });
                if (!error) console.log(result);
                else console.log(error);
              });
          }
        }
      );
  };

  get = (data) => {
    certcontract.methods
      .getcert(data.id)
      .call({ from: this.state.account }, (error, result) => {
        if (!error) {
          console.log(result);
          const v = Object.values(result);
          this.setState({ output: v });
          this.setState({ tofound: true });
        } else alert("Certificate not found");
      });
  };

  login = () => {
    this.setState({ isAuthenticated: true });
  };

  logout = () => {
    this.setState({ isAuthenticated: false });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Navhead 
            isAuthenticated={this.state.isAuthenticated} 
            onLogout={this.logout}
          />
          <Route
            path="/login"
            render={() => <Login onLogin={this.login} />}
          />
          <Route
            path="/"
            exact
            render={() =>
              this.state.isAuthenticated ? (
                <Forms addcertificate={this.add} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/verify"
            render={() =>
              this.state.isAuthenticated ? (
                <Getcert
                  getcertificate={this.get}
                  yes={this.state.tofound}
                  details={this.state.output}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/view"
            render={() =>
              this.state.isAuthenticated ? (
                <Certificate
                  sname={this.state.name}
                  course={this.state.course}
                  txh={this.state.txh}
                  id={this.state.id}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route path="/intro" component={Intro} />
          <Route path="/reg" component={Reg} />
        </Router>
      </div>
    );
  }
}

export default App;
