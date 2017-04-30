import React, { Component } from 'react'
import { connect } from 'react-redux'
import {asyncContainer, Typeahead} from 'react-bootstrap-typeahead'
//import SliderComponent from './Slider'
import CustomizedSlider from './CustomizedSlider'
import CustomizedRange from './CustomizedRange'
const AsyncTypeahead = asyncContainer(Typeahead)
import handle from './handle'
import BasicSlider from './BasicSlider'

const Tooltip = require('rc-tooltip')
const Slider = require('rc-slider')
const createSliderWithTooltip = Slider.createSliderWithTooltip
const Handle = Slider.Handle
const Range = createSliderWithTooltip(Slider.Range)


// require('rc-slider/assets/index.css')
// require('rc-tooltip/assets/bootstrap.css')

const AsyncSearch = React.createClass({
  getInitialState() {
    return {
      allowNew: false,
      multiple: false,
      options: [],
    }
  },

  render() {
    const wrapperStyle = { width: 400, margin: 50 }
    const style = { width: 400, margin: 50 }
    return (
      <div>
                <pre>{JSON.stringify(this.state, null, 2)} </pre>
        <AsyncTypeahead
          {...this.state}
          labelKey="original_title"
          onSearch={this.handleSearch}
          placeholder="Search for a movie..."
          onInputChange={this.onInputChange}
          //renderMenuItemChildren={this._renderMenuItemChildren}
        />
        {/*{this._renderCheckboxes()}*/}
        {/*<div style={wrapperStyle}>
          <p>Range with custom handle</p>
          <Range min={0} max={20} defaultValue={[3, 10]} tipFormatter={value => `${value}%`} />
        </div>*/}
        <div style={style}>
          <p>Customized Slider</p>
          {/*<CustomizedSlider />*/}
          <Slider tipTransitionName="rc-slider-tooltip-zoom-down" />
        </div>
    <div style={style}>
      <p>Basic Range，`allowCross=false`</p>
      <Range allowCross={false} defaultValue={[1888, 2017]} />
    </div>

        <div style={wrapperStyle}>
      <p>Range with custom handle</p>
      <Range min={1888} max={2017} defaultValue={[1950, 2010]} tipFormatter={value => `${value}year`} />
    </div>
    <div style={style}>
      <BasicSlider />
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
  },

  handleSearch(query) {
    if (!query) {
      return
    }

    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=ca66037b5b40d478784f66cc2a04b448`)
    // fetch(`https://api.themoviedb.org/3/discover/movie?api_key=ca66037b5b40d478784f66cc2a04b448&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2017-01-01&release_date.lte=2017-12-31`)
      .then(resp => resp.json())
      .then(json => {
        return json.results.filter(function(x) {
          return x.release_date.indexOf('2017')
        })
      })
      .then(jsonfiltered => this.setState({options: jsonfiltered}))
  },
})

// export default AsyncSearch

//========container for AsyncSearch
import { setSelectedMovieId } from '../reducers/movies'

const mapStateToProps = (state, ownProps) => (
  {
    selectedMovieId: state.movies.selectedMovieId
  }
)

const mapDispatchToProps = (dispatch) => ({
  setMovieId: (movieId) => {
    dispatch(setSelectedMovieId(movieId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AsyncSearch)
