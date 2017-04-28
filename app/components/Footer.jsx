import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default (props) => {
  return (
        <div className="col-xs-12 col-sm-6 col-lg-5">
          <a href="./" title="ReactJS TMDb Movie Search"><img src={props.TMDBLogo} className="logo" alt="The Movie Database" /></a>
        </div>
  )
}
