import React, { Component } from 'react'
import { connect } from 'react-redux'
import {asyncContainer, Typeahead} from 'react-bootstrap-typeahead'
const AsyncTypeahead = asyncContainer(Typeahead)

const AsyncSearch = React.createClass({
  getInitialState() {
    return {
      allowNew: false,
      multiple: false,
      options: [],
    }
  },

  render() {
    //console.log(props)
    return (
      <div>
        <AsyncTypeahead
          {...this.state}
          labelKey="original_title"
          onSearch={this._handleSearch}
          placeholder="Search for a movie..."
          //onInputChange={this.onInputChange}
          //renderMenuItemChildren={this._renderMenuItemChildren}
        />
        {/*{this._renderCheckboxes()}*/}
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

  // onInputChange(){
  //   setSelectedMovieId(this.state.options.id)
  // },

  _handleSearch(query) {
    if (!query) {
      return
    }

    //fetch(`https://api.github.com/search/users?q=${query}`)
    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=ca66037b5b40d478784f66cc2a04b448`)
      .then(resp => resp.json())
    //  .then(json => this.setState({options: json.items}))
      .then(json => this.setState({options: json.results}))
  },
})

export default AsyncSearch

// const mapStateToProps = (state, ownProps) => (
//   {
//     selectedMovieId: state.movies.selectedMovieId
//   }
// )

// const mapDispatchToProps = (dispatch) => ({
//   setSelectedMovieId: (movieId) => {
//     dispatch(setSelectedMovieId(movieId))
//   }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(AsyncSearch)
