import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-8 col-lg-11"></div>
        <div className="col-xs-4 col-lg-1">
          <a href="https://www.themoviedb.org/?language=en" target="_blank" title="React Redux TMDb Movie Search"><img src={props.TMDBLogo} width="100" height="100" alt="The Movie Database" /></a>
        </div>
      </div>
    </div>
  )
}
