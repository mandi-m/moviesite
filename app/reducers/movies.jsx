// Required libraries
import axios from 'axios'

// ----------- Actions
const SELECT_MOVIE = 'SELECT_MOVIE'

// ----------- Action Creators
export const setSelectedMovieId = (selectedMovieId) => ({
  type: SELECT_MOVIE,
  selectedMovieId
})


// ----------- Reducer
const initialState = {
  selectedMovieId: 267935
}

export default function moviesReducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
  case SELECT_MOVIE:
    nextState.selectedMovieId = action.selectedMovieId
    break

  default:
    return state
  }
  return nextState
}

// ----------- Disptachers
// export const fetchProducts = () => (dispatch) => {
//   axios.get('/api/products')
//       .then(response => {
//         let products = response.data
//         let productsWithRatings = products.map(product => ({...product, rating: product.reviews.reduce((acc, review) => acc+=review.stars, 0)/product.reviews.length}))
//         dispatch(receiveProducts(productsWithRatings))
//       })
//       .catch(console.error)
// }

// export const addProduct = (productData) => (dispatch) => {
//   axios.post('/api/products/add', productData)
//       .then(() => {
//         // dispatch(newProduct(response.data));
//         dispatch(fetchProducts())
//       })
//       .catch(console.error)
// }
