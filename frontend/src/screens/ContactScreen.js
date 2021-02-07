import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';

export default class Contact extends Component {
componentDidMount() {
  window.scrollTo(0, 0);
}
  state = {
    name: "",
    message: "",
    email: "",
    subject: "",
    sent: false,
    buttonText: "Envoyer",
    emailError: false,
  };
// Functions
resetForm = () => {
    this.setState({
      name: "",
      message: "",
      email: "",
      subject: "",
      buttonText: "Message envoyé",
    });

    setTimeout(() => {
      this.setState({ sent: false });
    }, 3000);
  };

  handleChangeEmail(e) {
    if (
      !e.target.value.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      this.setState({
        email: e.target.value,
      });
      this.setState({ emailError: true });

      if (this.state.email === "") {
        // check if the input is empty
        this.setState({ emailError: false });
      }
    } else {
      this.setState({ email: e.target.value, emailError: false });
    }
  }

  formSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      buttonText: "...sending",
    });

    let data = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
      subject: this.state.subject,
      type: "contact"
    };

    try {
      await axios.post("api/send", data)
      this.setState({ sent: true }, this.resetForm());
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
        <form className="contact-form" onSubmit={(e) => this.formSubmit(e)}>
          {this.state.sent && <Alert style={{ fontSize: "inherit" }} severity="success">
            Merci, votre message a bien été envoyé à notre service client!
          </Alert>}
        <h1>Contactez nous</h1>
        <TextField
          id="outlined-basic"
          placeholder="Entrer le sujet"
          label="Sujet"
          
          value={this.state.subject}
          onChange={(e) => this.setState({ subject: e.target.value })}
          required
          style={{ minWidth: '50%' }}
        />
        <br />
        <br />
        <br />

        <TextField
          id="outlined-basic"
          placeholder="Entrer le nom"
          label="Nom"
          
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          required
          type="text"
          style={{ minWidth: '50%' }}
        />
        <br />
        <br />
        <br />

        <TextField
          id="outlined-basic"
          label="Email"
          placeholder="Entrer l'email"
          
          value={this.state.email}
          onChange={(e) => this.handleChangeEmail(e)}
          error={this.state.emailError}
          required
          type="email"
          style={{ minWidth: '50%' }}
        />
        <br />
        <br />
        <br />
        <TextField
          id="standard-multiline-flexible"
          label="Message"
          placeholder="Entrer le message"
          
          multiline
          rowsMin={3}
          rowsMax={4}
          value={this.state.message}
          onChange={(e) => this.setState({ message: e.target.value })}
          required
          type="text"
          style={{ minWidth: '50%' }}
        />
        <br />
        <br />
        <br />
        <div className="button--container">
          <Button type="submit" color="primary" variant="contained">
            {this.state.buttonText}
          </Button>
        </div>
      </form>
    );
  }
}
