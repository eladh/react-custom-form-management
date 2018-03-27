import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class TextField extends Component {

  constructor(props) {
    super(props);
    this.shouldDisplayError = this.shouldDisplayError.bind(this);
  }

  shouldDisplayError() {
    return this.props.showError && this.props.errorText !== "";
  }

  render() {
    return (
      <div className="form-field text-field">
        <input type={this.props.type || "text"} placeholder={this.props.placeholder}
               value={this.props.text} onChange={this.props.onFieldChanged}  />
          <div className="validation-error" display={this.shouldDisplayError()}>
            <span className="text">{this.props.errorText}</span>
          </div>
      </div>
    );
  }
}

TextField.propTypes = {
  showError: PropTypes.bool.isRequired,
  onFieldChanged: PropTypes.func.isRequired
};

