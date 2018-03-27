import React, { Component } from 'react';
import InputField from './Framework/Components/InputField.js';
import update from 'immutability-helper';
import { ValidationManger } from './Framework/Validations/validatonManager.js'
import { required, minLength ,numeric , exactLength , alphaNumeric ,email} from './Framework/Validations/validations.js';
import $ from 'jquery';

// TODO - consider refactor validation as component so validation  can be described in the render() HTML

class CustomerForm extends Component {

    constructor(props) {
        super(props);

        // Bind API
        this.handleFieldChanged = this.handleFieldChanged.bind(this);
        this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
        this.errorFor = this.errorFor.bind(this);

        this.validationManger = new ValidationManger();

        // Register Validations
        this.validationManger.addValidation("firstName", "First Name", required , minLength(2) ,alphaNumeric);
        this.validationManger.addValidation("lastName", "Last Name", required , minLength(2) ,alphaNumeric);
        this.validationManger.addValidation("emailAddress", "Email Address" , required ,email);
        this.validationManger.addValidation("phoneNumber", "Phone Number" , required ,numeric ,exactLength(10));

        // Init Form State
        this.state = {
            showErrors: false,
            validationErrors: { },
        }
    }

    errorFor(field) {
       return this.state.validationErrors[field] || "";
    }

    handleFieldChanged(field) {
        return (e) => {
            let newState = update(this.state, {
                [field]: {$set: e.target.value}
            });
            this.validationManger.validate(field ,newState);
            this.setState(newState);
        };
    }

    handleSubmitClicked() {
        this.validationManger.validateForm(this.state);
        let emptyObject = $.isEmptyObject(this.state.validationErrors);
        if(emptyObject === false) return null;
        return this.props.onFormSubmitted(this.state);
    }

    render() {
        return (
            <div className="CreateAccount">
                <h2>Jones simple Form</h2>

                <InputField placeholder="First Name" showError={this.state.showErrors}
                            text={this.props.firstName} onFieldChanged={this.handleFieldChanged("firstName")}
                            errorText={this.errorFor("firstName")} />

                <InputField placeholder="Last Name" showError={this.state.showErrors}
                            text={this.props.lastName} onFieldChanged={this.handleFieldChanged("lastName")}
                            errorText={this.errorFor("lastName")} />

                <InputField placeholder="Phone Number" showError={this.state.showErrors} type="tel"
                            text={this.props.phone} onFieldChanged={this.handleFieldChanged("phoneNumber")}
                            errorText={this.errorFor("phoneNumber")} />

                <InputField placeholder="Email Address" showError={this.state.showErrors} type="email"
                            text={this.props.emailAddress} onFieldChanged={this.handleFieldChanged("emailAddress")}
                            errorText={this.errorFor("emailAddress")} />

                <input id="submitFromButton" type='submit' value="Submit Form" onClick={this.handleSubmitClicked} />
            </div>
        );
    }
}

export default CustomerForm;
