import React, { Component } from 'react';
import FocusableInput from './FocusableInput';

export default class IntegerField extends FocusableInput {
    constructor(props) {
        super(props);

        this.state.inputRef = React.createRef();
        this.state.value = 0;
        this.state.changeCallback = this.props.changeCallback;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.focusFlag != this.state.focusFlag) {
            this.handleFocusChange();
        }
    }

    handleFocusChange() {
        if (this.state.inputRef.current.value == "" && this.state.focusFlag == false) {
            this.state.inputRef.current.value = "0";
        }
    }

    render() {
        return (
            <input {...this.props}
                ref={this.state.inputRef}
                defaultValue="0"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                type="number"
                min="0"
                step="1"
            >
                {this.props.children}
            </input>
        );
    }
}