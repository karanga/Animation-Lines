import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Alert } from 'reactstrap';
import AlertComp from '../Components/AlertComp.js';
import { InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Label, Col } from 'reactstrap';

export default class SettingsFormView extends Component {
    constructor(props) {
      super(props);
      this.state = {value: '', visible: true};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onDismiss = this.onDismiss.bind(this);

    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      console.log('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }

    onDismiss() {
      this.setState({ visible: !this.state.visible });
    }
  
    render() {
      return (
        <div>
            <div>
           
               
            </div>
            <div>
            <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                I am an alert and I can be dismissed!
              </Alert>
            </div>
            <div>

            
                <form onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Label for="exampleEmail" sm={1}>Email</Label>
                  <Col sm={8}>
                    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </Col>
                    <Col sm={2}>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="examplePassword" sm={1}>Password</Label>
                  <Col sm={8}>
                    <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                  </Col>
                  <Col sm={2}>
                  <Button onSubmit={this.handleSubmit} color="primary">Submit</Button>
                  </Col>
                </FormGroup>
                
                <FormGroup row>
                  <Col sm={9}>
                  </Col>
                  <Col sm={2}>
                    <Button onClick={this.onDismiss} color="danger">Danger!</Button></Col>
                    </FormGroup>
                </form> 
            </div>
        </div>
      );
    }
  }