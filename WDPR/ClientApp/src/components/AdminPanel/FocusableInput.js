import React, { Component } from 'react';

export default class FocusableInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusFlag: false,
            focusCallback: this.props.focusCallback
        }

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleFocus() {
        this.setState({
            focusFlag: true
        });
    }

    handleBlur() {
        this.setState({
            focusFlag: false
        });
    }

    render() {
        return (
            <input {...this.props} ref={this.state.inputRef} onBlur={this.handleBlur} onFocus={this.handleFocus}>{this.props.children}</input>
        );
    }
}