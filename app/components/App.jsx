import React, { Component } from 'react';
import SearchBox from './SearchBox';
import MovieCard from './MovieCard';
import Footer from './Footer'
import {Typeahead} from 'react-bootstrap-typeahead' // ES2015
import AsyncSearch from './AsyncSearch'
import { connect } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieID: 321612 // set initital load movie - Big Friendly Giant
    }
  }
  render() {
    const TMDBLogo = 'https://www.themoviedb.org/assets/static_cache/dd25a8d6d44072f1be5a9daf03470526/images/v4/logos/293x302-powered-by-square-green.png'
    let backdropIMG = 'https://image.tmdb.org/t/p/original' + this.props.selectedMovieData.backdrop_path
    let sectionStyle = {
      backgroundImage: 'url(' + backdropIMG + ')'
    }
    return (
      <div>
        <section style={ sectionStyle }>
        {/*<SearchBox fetchMovieID={this.fetchMovieID.bind(this)}/>*/}
        <AsyncSearch />
        {/*<MovieCard data={this.state || this.props.selectedMovieId}/>*/}
        <MovieCard />
        <Footer TMDBLogo={TMDBLogo}/>
        </section>
      </div>
    )
  }

  // the api request function
  fetchApi(url) {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // update state with API data
      this.setState({
        movieID: data.id,
        overview: data.overview,
        homepage: data.homepage,
        poster: data.poster_path,
        genre: data.genres,
        release: data.release_date,
        vote: data.vote_average,
        runtime: data.runtime,
        revenue: data.revenue,
        backdrop: data.backdrop_path

      })
    })
    .catch(err => console.log('Movie not found! Error: ', err))
  } // end function

  fetchMovieID(movieID) {
    const url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=ca66037b5b40d478784f66cc2a04b448`
    this.fetchApi(url)
  } // end function

  componentDidMount() {
    const url = `https://api.themoviedb.org/3/movie/${this.state.movieID}?&api_key=ca66037b5b40d478784f66cc2a04b448`
    this.fetchApi(url)
  }
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
