import React, { Component } from 'react'
import { connect } from 'react-redux'
import {asyncContainer, Typeahead} from 'react-bootstrap-typeahead'
const AsyncTypeahead = asyncContainer(Typeahead)
import BasicSlider from './BasicSlider'

const AsyncSearch = React.createClass({
  getInitialState() {
    return {
      // allowNew: false,
      // multiple: false,
      options: [],
    }
  },

  render() {
    // const style = { width: 400, margin: 150 }
    return (
      <div>
        <div className="container">
          <div className="row myline">
            {/*<div className="col-s-1 col-md-4 col-lg-2"></div>
            <div className="col-s-10 col-md-4 col-lg-8">
              <div className="style"><BasicSlider /></div></div>
            <div className="col-s-1 col-md-4 col-lg-2"></div>*/}
          </div>
          <div className="row myline">
            <div className="col-s-1 col-md-4 col-lg-4"></div>
            <div className="col-s-10 col-md-4 col-lg-4">
              <div className="style">
              <AsyncTypeahead
                {...this.state}
                labelKey="original_title"
                onSearch={this.handleSearch}
                placeholder="Search for a movie..."
                onInputChange={this.onInputChange}
              /></div>
            </div>
            <div className="col-s-1 col-md-4 col-lg-4"></div>
          </div>
        </div>
      </div>
    )
  },

  findMovieByName(movieName) {
    const movieObj = this.state.options.find(function(x){
      return x.original_title===movieName
    }) || {}
    return movieObj['id']
  },

  onInputChange(nameMovie) {
    const movieId = this.findMovieByName(nameMovie)
    movieId && this.props.setMovieId(movieId)
    movieId && this.props.fetchMovieData(movieId)
  },

  handleSearch(query) {
    if (!query) {
      return
    }
    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=ca66037b5b40d478784f66cc2a04b448`)
      .then(resp => resp.json())
      .then(jsonfiltered => this.setState({options: jsonfiltered.results}))
  },
})

//========container for AsyncSearch
import { setSelectedMovieId, fetchMovieData } from '../reducers/movies'

const mapStateToProps = (state, ownProps) => (
  {
    selectedMovieId: state.movies.selectedMovieId,
    startSearchDate: state.movies.startSearchDate,
    endSearchDate: state.movies.endSearchDate
  }
)

const mapDispatchToProps = (dispatch) => ({
  setMovieId: (movieId) => {
    dispatch(setSelectedMovieId(movieId))
  },
  fetchMovieData: (movieId) => {
    dispatch(fetchMovieData(movieId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AsyncSearch)
