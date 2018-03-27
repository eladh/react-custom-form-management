import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import CustomerForm from './CustomerForm.js';

class App extends Component {

  handleAfterFormSubmit(state) {
      window.Email.send(state.emailAddress,
          "sales@jones.com",
          "New Lead",
          "from : " + state.firstName + ' ' + state.lastName + ' ,phone: ' + state.phoneNumber,
          "smtp.sendgrid.net",
          "apikey",
          "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");
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
            <img src={logo} alt="logo" />
          <h2>Pay As You Go Insurance</h2>
        </div>
        <CustomerForm onFormSubmitted={this.handleAfterFormSubmit}/>
      </div>
    );
  }
}

export default App;
