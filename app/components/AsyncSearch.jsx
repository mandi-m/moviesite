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
    const style = { width: 400, margin: 50 }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="style"><BasicSlider /></div></div>
            <div className="col-md-4"></div>
          </div>
          <div className="row"></div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="style">
              <AsyncTypeahead
                {...this.state}
                labelKey="original_title"
                onSearch={this.handleSearch}
                placeholder="Search for a movie..."
                onInputChange={this.onInputChange}
              /></div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    )
  },

  /*_renderCheckboxes() {
    const checkboxes = [
      {label: 'Multi-Select', name: 'multiple'},
      {label: 'Allow custom selections', name: 'allowNew'},
    ]

    return checkboxes.map(({label, name}) => (
      <Checkbox
        checked={this.state[name]}
        key={name}
        name={name}
        onChange={this._handleChange}>
        {label}
      </Checkbox>
    ))
  },*/

  /*_renderMenuItemChildren(option, props, index) {
    return (
      <div key={option.id}>
        <img
          src={option.avatar_url}
          style={{
            height: '24px',
            marginRight: '10px',
            width: '24px',
          }}
        />
        <span>{option.login}</span>
      </div>
    )
  },*/

  // _handleChange(e) {
  //   const {checked, name} = e.target
  //   this.setState({[name]: checked})
  // },

  findMovieByName(movieName){
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
    //console.log(this.props.endSearchDate.substr(0, 4))
    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=ca66037b5b40d478784f66cc2a04b448`)
    // fetch(`https://api.themoviedb.org/3/discover/movie?api_key=ca66037b5b40d478784f66cc2a04b448&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&release_date.gte=2015-01-01&release_date.lte=2017-12-31`)
      .then(resp => resp.json())
      .then(jsonfiltered => this.setState({options: jsonfiltered.results}))


      // .then(json => {
      //   return json.results.filter(function(x) {
      //     return x.release_date.indexOf(this.props.endSearchDate.substr(0, 4)) >= 0
      //   })
      // })
  },
})

// export default AsyncSearch

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
