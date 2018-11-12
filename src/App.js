import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Following this tutorial
// https://sheelahb.com/blog/how-to-send-email-from-react-without-a-backend/
//
// Using username devd.zoro for EmailJs
// https://dashboard.emailjs.com/

class App extends Component {
  state = {
    feedback: "",
    formEmailSent: false
  };

  handleSubmit = event => {
    event.preventDefault();

    const {
      REACT_APP_EMAILJS_RECEIVER: receiverEmail,
      REACT_APP_EMAILJS_TEMPLATEID: template
    } = this.props.env;

    this.sendFeedback(
      template,
      this.props.senderEmail,
      receiverEmail,
      this.state.feedback
    );

    this.setState({
      formSubmitted: true
    });
  };

  sendFeedback = (templateId, senderEmail, receiverEmail, feedback) => {
    window.emailjs
      .send("mailgun", templateId, {
        senderEmail,
        receiverEmail,
        feedback
      })
      .then(res => {
        this.setState({ formEmailSent: true });
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error("Failed to send feedback. Error: ", err));
  };

  handleChange = (event) => {
    this.setState({ feedback: event.target.value });
  };

  handleClose = () => {
    //I don't know what this does
  };

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <form style={{display: 'none'}} className="feedback-form" onSubmit={this.handleSubmit}>
          <h1>Your Feedback</h1>
          <textarea
            className="text-input"
            id="feedback-entry"
            name="feedback-entry"
            onChange={this.handleChange}
            placeholder="Enter your feedback here"
            required
            value={this.state.feedback}
          />
          <div className="btn-group">
            <button className="btn btn--cancel" onClick={this.handleClose}>
              Cancel
            </button>
            <input type="submit" value="Submit" className="btn btn--submit" />
          </div>
        </form>

        
      </div>
    );
  }
}

export default App;
