# Welcome to MovieSite

MovieSite was made over a two-day period during Fullstack Academy of Code's Stackathon. It is a MVP movie search tool made with React, Redux, Bootstrap, and the [Movie Database's API](https://www.themoviedb.org/documentation/api){:target="_blank"}.

## Installation
First, clone the repository through git and change to the new directory:
```
git clone https://github.com/
cd moviesite
```
Then install the required dependencies:
```
npm install
```
Run the app:
```
npm start
```

## React-Bootstrap-Typeahead
Wanting to use the powerful <a href="https://twitter.github.io/typeahead.js/" target="_blank">twitter typeahead tool</a>, but finding it difficult to integrate this jquery based JavaScript library into my react component, I instead opted for the <a href="https://www.npmjs.com/package/react-bootstrap-typeahead" target="_blank">React-Bootstrap-Typeahead tool<a>.

The AsyncSearch React component fetches data asynchronously from the Movie Database's API. The response is converted to JSON and then the resulting array is set on the local state, which the AsyncTypeahead then uses to render the matching movie results.

## Gifs
![MovieSite Screenshot 1](./assets/moviesite.gif "moviesite")

## Contributors
* [Mandi Meidlinger](https://www.linkedin.com/in/mandi-meidlinger/)
* Fullstack Academy (provided initial template)

## License
MIT © Mandi Meidlinger
