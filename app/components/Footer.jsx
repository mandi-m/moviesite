import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default (props) => {
  return (
        <div className="col-xs-6 col-sm-3 col-lg-1">
          <a href="https://www.themoviedb.org/?language=en" target="_blank" title="ReactJS TMDb Movie Search"><img src={props.TMDBLogo} className="logo" alt="The Movie Database" /></a>
        </div>
  )
}
