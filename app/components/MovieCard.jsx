import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
let numeral = require('numeral')
let backdropIMG

class MovieCard extends Component {
  render() {
    let data = this.props.selectedMovieData
    console.log(data)
    // if movie ID found, then...
    let posterIMG = 'https://image.tmdb.org/t/p/w300' + data.poster_path,
      production = data.production,
      productionCountries = data.production_countries,
      genres = data.genre,
      totalRevenue = data.revenue,
      productionList = nestedDataToString(production),
      productionCountriesList = nestedDataToString(productionCountries),
      noData = '-',
      genresList = nestedDataToString(data.genres),
      backdropIMG = 'https://image.tmdb.org/t/p/original' + data.backdrop_path

    return (
      <div>
          <div className="container">
            <div className="row">
              <div className="col-sm-2"></div>
              <div className="col-sm-4 nopadding">
                <img src={posterIMG} />
              </div>
              <div className="col-sm-5 bg-info nopadding">
                <h1>{ data.original_title}</h1>
                <h3 className="lead">{ data.tagline }</h3>
                <p>{ data.overview }</p>
                <p>Genres: { genresList }</p>
                <p>Original Release: {dateFormat(data.release_date, 'mmmm dS, yyyy')}</p>
                <p>Budget: { moneyFormatter.format(data.budget) }</p>
                <p>Revenue: { moneyFormatter.format(data.revenue) }</p>
                <p>Length: { data.runtime }</p>
                <p>Viewer Rating: { data.vote_average }/10</p>
              </div>
              <div className="col-sm-1"></div>
            </div>
          </div>
      </div>
    )
  }
  componentDidMount() {
    document.body.style.backgroundImage = 'url(' + backdropIMG + ')';
    //document.getElementById('myElement').style.backgroundImage = 'url(' + backdropIMG + ')';
  }
  ComponentDidUpdate() {
    document.body.style.backgroundImage = 'url(' + backdropIMG + ')';
  }
}


function nestedDataToString(nestedData) {
  let nestedArray = [],
    resultString
  nestedArray.forEach(function(item, i) {
    nestedArray.push(item.name)
  })
  resultString = nestedArray.join(', ') // array to string
  return resultString
};

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
})


//========container for MovieCard
import { } from '../reducers/movies'

const mapStateToProps = (state, ownProps) => (
  {
    selectedMovieData: state.movies.selectedMovieData
  }
)

const mapDispatchToProps = (dispatch) => (
  {
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard)
