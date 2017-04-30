import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
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
      genresList = nestedDataToString(genres);
    backdropIMG = 'https://image.tmdb.org/t/p/original' + data.backdrop_path

    // conditional statements for no data
    if (data.vote === 'undefined' || data.vote === 0) {
      data.vote = noData
    } else {
      data.vote = data.vote + ' / 10'
    };

    if (totalRevenue === 'undefined' || totalRevenue === 0) {
      totalRevenue = noData
    } else {
      totalRevenue = numeral(data.revenue).format('($0,0)');
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-4">
            <img src={posterIMG} />
          </div>
          <div className="col-lg-4 bg-info">
            movie stuff here
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    document.body.style.backgroundImage = 'url(' + backdropIMG + ')';
    //document.backgroundImage = 'url(' + backdropIMG + ')';
  }
  ComponentDidUpdate() {
    document.body.style.backgroundImage = 'url(' + backdropIMG + ')';
    //document.backgroundImage = 'url(' + backdropIMG + ')';
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
