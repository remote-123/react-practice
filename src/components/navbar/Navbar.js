import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
    <nav class="navbar navbar-expand-lg navbar-dark navbar-stick-dark" data-navbar="static">
        <div class="container">

          <div class="navbar-left">
            <button class="navbar-toggler" type="button"><span class="navbar-toggler-icon"></span></button>
                <a class="navbar-brand" href="staking.html">
                <img class="logo-dark" src="assets/img/logo-dark.png" alt="logo"></img>
                <img class="logo-light" src="assets/img  /logo-light.png" alt="logo"></img>
                </a>
          </div>
                <a class="btn btn-xs btn-round btn-success" href="#">Connect to Wallet</a>
        </div>
    </nav>
    );
  }
}


