// Required libraries
import axios from 'axios'

// ----------- Actions
const SELECT_MOVIE = 'SELECT_MOVIE'
const START_DATE = 'START_DATE'
const END_DATE = 'END_DATE'
const MOVIE_DATA = 'MOVIE_DATA'

// ----------- Action Creators
export const setSelectedMovieId = (selectedMovieId) => ({
  type: SELECT_MOVIE,
  selectedMovieId
})

export const setStartSearchDate = (startSearchDate) => ({
  type: START_DATE,
  startSearchDate
})

export const setEndSearchDate = (endSearchDate) => ({
  type: END_DATE,
  endSearchDate
})

export const setMovieData = (selectedMovieData) => ({
  type: MOVIE_DATA,
  selectedMovieData
})


// ----------- Reducer
const initialState = {
  selectedMovieId: 321612,
  startSearchDate: '1950-01-01',
  endSearchDate: '2010-12-31',
  selectedMovieData:{
    adult: false,
    backdrop_path: '/6aUWe0GSl69wMTSWWexsorMIvwU.jpg',
    belongs_to_collection: null,
    budget: 160000000,
    genres: [
    {
    id: 14,
    name: 'Fantasy'
    },
    {
    id: 10749,
    name: 'Romance'
    }
    ],
    homepage: 'http://movies.disney.com/beauty-and-the-beast-2017',
    id: 321612,
    imdb_id: 'tt2771200',
    original_language: 'en',
    original_title: 'Beauty and the Beast',
    overview: 'A live-action adaptation of Disney\'s version of the classic "Beauty and the Beast" tale of a cursed prince and a beautiful young woman who helps him break the spell.',
    popularity: 128.168016,
    poster_path: '/tWqifoYuwLETmmasnGHO7xBjEtt.jpg',
    production_companies: [
    {
    name: 'Walt Disney Pictures',
    id: 2
    },
    {
    name: 'Mandeville Films',
    id: 10227
    }
    ],
    production_countries: [
    {
    iso_3166_1: 'GB',
    name: 'United Kingdom'
    },
    {
    iso_3166_1: 'US',
    name: 'United States of America'
    }
    ],
    release_date: '2017-03-16',
    revenue: 1048233200,
    runtime: 129,
    spoken_languages: [
    {
    iso_639_1: 'en',
    name: 'English'
    }
    ],
    status: 'Released',
    tagline: 'Be our guest.',
    title: 'Beauty and the Beast',
    video: false,
    vote_average: 6.8,
    vote_count: 2142
    }
  }


export default function moviesReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case SELECT_MOVIE:
    nextState.selectedMovieId = action.selectedMovieId
    break

  case START_DATE:
    nextState.startSearchDate = action.startSearchDate
    break

  case END_DATE:
    nextState.endSearchDate = action.endSearchDate
    break

  case MOVIE_DATA:
    nextState.selectedMovieData = action.selectedMovieData
    break

  default:
    return state
  }
  return nextState
}

// ----------- Dispatchers
export const fetchMovieData = movieId => (dispatch) => {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?&api_key=ca66037b5b40d478784f66cc2a04b448`)
    .then(res => res.json())
    .then(data => dispatch(setMovieData(data)))
    .catch(err => console.log('Movie not found! Error: ', err))
}
