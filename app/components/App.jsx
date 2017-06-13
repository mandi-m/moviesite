import React, { Component } from 'react'
import SearchBox from './SearchBox'
import MovieCard from './MovieCard'
import Footer from './Footer'
import {Typeahead} from 'react-bootstrap-typeahead' // ES2015
import AsyncSearch from './AsyncSearch'
import { connect } from 'react-redux'

const App = (props) => {
  const TMDBLogo = 'https://www.themoviedb.org/assets/static_cache/dd25a8d6d44072f1be5a9daf03470526/images/v4/logos/293x302-powered-by-square-green.png'
  const backdropIMG = 'https://image.tmdb.org/t/p/w1000' + props.selectedMovieData.backdrop_path
  const backdropURL = 'url(' + backdropIMG + ')'
  const divStyle = {
    backgroundImage: backdropURL,
    // resizeMode: backdropURL.resizeMode.contain
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div style={ divStyle }>
      <AsyncSearch />
      <MovieCard />
      <Footer TMDBLogo={TMDBLogo}/>
    </div>
  )
}

//========container for App
import { setSelectedMovieId } from '../reducers/movies'

const mapStateToProps = (state, ownProps) => (
  {
    selectedMovieId: state.movies.selectedMovieId,
    selectedMovieData: state.movies.selectedMovieData
  }
)

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
