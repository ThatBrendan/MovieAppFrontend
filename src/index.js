import React from "react";
import ReactDOM from "react-dom";

import axios from "axios";

import "./script.css";

class MovieGenreRow extends React.Component {
  render() {
    const genre = this.props.genre;
    return <tr>{/* <th colSpan="4">{}</th> */}</tr>;
  }
}

class SpecificMovieRow extends React.Component {
  render() {
    return;
  }
}

class MovieTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  componentDidMount() {
    axios
      .get("https://localhost:8080/Home/Films")
      .then((response) => this.setState({ movies: response.data }));
  }

  render() {
    const movie = this.state.movies;
    const rows = [];
    let lastGenre = null;

    this.state.movies.forEach((movie) => {
      if (movie.genre !== lastGenre) {
        rows.push(<MovieGenreRow genre={movie.genre} key={movie.genre} />);
      }
      rows.push(<MovieRow movies={movie} key={movie.genre} />);
    });

    return (
      <table className="movieTable">
        <thead>
          <tr>
            <th>Genre</th>
            <th>Movie title</th>
            <th>Release year</th>
          </tr>
        </thead>
        <tbody>{rows} </tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form className="searchBar">
        <input type="text" placeholder="Search for movie.." />
        <button>Search movie</button>
        <label for="category">Category</label>
        <select>
          <option value="Horror">Horror</option>
          <option value="Horror">Romance</option>
          <option value="Horror">Action</option>
        </select>
      </form>
    );
  }
}

class NavigationPan extends React.Component {
  render() {
    return <h1 className="banner">MOVIE APP</h1>;
  }
}

class MovieMainPage extends React.Component {
  render() {
    return (
      <div className="movieMain">
        <NavigationPan />
        <SearchBar />
        <MovieTable movies={this.props.movies} />
      </div>
    );
  }
}

const Movies = [
  {
    title: "Pirates of the Carribean",
    release_year: 2009,
    genre: "Action",
    released: true,
  },
  {
    title: "Superman",
    release_year: 2021,
    genre: "Action",
    released: true,
  },
  {
    title: "Snakes on the plane",
    release_year: 2001,
    genre: "Drama",
    released: true,
  },
  {
    title: "Titanic",
    release_year: 2009,
    genre: "Drama",
    released: false,
  },
  {
    title: "Bend it like Beckham",
    release_year: 2010,
    genre: "Sports",
    released: true,
  },
  {
    title: "Save the last dance",
    release_year: 2015,
    genre: "Dance",
    released: false,
  },
  {
    title: "Stomp the yard",
    release_year: 1999,
    genre: "Dance",
    released: false,
  },
  {
    title: "Friday the 13th",
    release_year: 2000,
    genre: "Horror",
    released: true,
  },
];

ReactDOM.render(
  <MovieMainPage movies={Movies} />,
  document.getElementById("root")
);
