import React, { Component } from 'react';
import SearchBox from './SearchBox';
import Card from './card';
import Bloodhound from 'bloodhound-js'
import typeahead from 'typeahead'
import $ from 'jquery'
import Footer from './Footer'
import {Typeahead} from 'react-bootstrap-typeahead' // ES2015
import AsyncSearch from './AsyncSearch'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieID: 267935 // set initital load movie - Big Friendly Giant
    }
  }
  render() {
    const TMDBLogo = 'https://www.themoviedb.org/assets/static_cache/dd25a8d6d44072f1be5a9daf03470526/images/v4/logos/293x302-powered-by-square-green.png'
    return (
      <div>
        {/*<SearchBox fetchMovieID={this.fetchMovieID.bind(this)}/>*/}
        <AsyncSearch />
        <Card data={this.state}/>
        <Footer TMDBLogo={TMDBLogo}/>
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

//     const suggests = new Bloodhound({
//       datumTokenizer: function(datum) {
//         return Bloodhound.tokenizers.whitespace(datum.value)
//       },
//       queryTokenizer: Bloodhound.tokenizers.whitespace,
//       remote: {
//         url: 'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=ca66037b5b40d478784f66cc2a04b448',
//         filter: function(movies) {
//           // Map the remote source JSON array to a JavaScript object array
//           return $.map(movies.results, function(movie) {
//             return {
//               value: movie.original_title, // search original title
//               id: movie.id // get ID of movie simultaniously
//             }
//           })
//         }
//       }
//     })

//     suggests.initialize() // initialise bloodhound suggestion engine

// const $typeahead = $('.typeahead')
// console.log($typeahead)

//     // Instantiate the Typeahead UI
//     typeahead($typeahead,
//     //{
//     //   hint: true,
//     //   highlight: true,
//     //   minLength: 2
//     // },
//     {source: suggests.ttAdapter()}).on('typeahead:selected', function(obj, datum) {
//       this.fetchMovieID(datum.id)
//     }.bind(this)) // END Instantiate the Typeahead UI
//   } // end component did mount function

//   // } // END CLASS - APP
// }
