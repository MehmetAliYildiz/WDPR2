import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import Voorstelling from "./components/Voorstelling";
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
        <div className={"App"}>
            <Voorstelling></Voorstelling>
        </div>
    );
  }
}
