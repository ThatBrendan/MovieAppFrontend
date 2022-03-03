import React from "react";
import ReactDOM from "react-dom";

import axios from "axios";

import "./script.css";

class DeleteReview extends React.Component {
  state = {
    user_review_id: "",
  };
  handleChange = (e) => {
    this.setState({
      user_review_id: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .delete(
        `http://44.203.117.199:8080/Home/review/delete/${this.state.user_review_id}`
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        window.location.reload(false);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Review ID" onChange={this.handleChange} />
          <button type="submit">Delete</button>
        </form>
      </div>
    );
  }
}

class PutReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_review_id: "",
      user_review: "",
      // updatedAt: null,
    };
  }

  onUserReviewIDChange = (e) => {
    this.setState({
      user_review_id: e.target.value,
    });
  };

  onUserReviewChange = (e) => {
    this.setState({
      user_review: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://44.203.117.199:8080/Home/review/update/${this.state.user_review_id}?user_review=${this.state.user_review}`
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    window.location.reload(false);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Review ID"
            value={this.state.user_review_id}
            onChange={this.onUserReviewIDChange}
            required
          />
          <input
            placeholder="Review"
            value={this.state.user_review}
            onChange={this.onUserReviewChange}
            required
          />
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

class PostReview extends React.Component {
  state = {
    film_film_id: "",
    user_review: "",
  };

  onFilmIDChange = (e) => {
    this.setState({
      film_film_id: e.target.value,
    });
  };

  onUserReviewChange = (e) => {
    this.setState({
      user_review: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      film_film_id: this.state.film_film_id,
      user_review: this.state.user_review,
    };
    axios
      .post(
        `http://44.203.117.199:8080/Home/Add_Review?film_film_id=${this.state.film_film_id}&user_review=${this.state.user_review}`
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    window.location.reload(false);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Film ID"
            value={this.state.film_film_id}
            onChange={this.onFilmIDChange}
            required
          />
          <input
            placeholder="Review"
            value={this.state.user_review}
            onChange={this.onUserReviewChange}
            required
          />
          <button type="submit">Post</button>
        </form>
      </div>
    );
  }
}

class FilmRow extends React.Component {
  render() {
    const filmData = this.props.filmInfo;
    return (
      <div className="film-container">
        <div className="box">
          <img
            src={require("/Users/macintosh/Desktop/Web Dev/ReactApps/movie_reviewApp/src/images/popcorn.png")}
          />
          {/* <img
            src={
              "https://www.pngitem.com/pimgs/m/301-3014574_popcorn-cinema-png-download-movie-popcorn-transparent-background.png"
            }
          /> */}
          <h3 className="filmTitle">Title: {filmData.title}</h3>
          <p>
            Film rating: {filmData.rating} | Release year:{" "}
            {filmData.release_year}
          </p>
          <p>{filmData.description}</p>
          <p>Film ID: {filmData.film_id}</p>
          <p className="reviewDescription" id="reviewData">
            {filmData.userReview.map((filmReview) => (
              <div>
                <ul>
                  <li>Review: {filmReview.user_review}</li>
                  <li>Review ID: {filmReview.user_review_id}</li>
                </ul>
              </div>
            ))}
          </p>
          <PostReview />
          <PutReview />
          <DeleteReview />
        </div>
      </div>
    );
  }
}

class MovieTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { films: [] };
  }

  componentDidMount() {
    axios
      .get("http://44.203.117.199:8080/Home/Films")
      .then((response) => this.setState({ films: response.data }));
  }

  render() {
    const film = this.state.films;
    const filterText = this.props.filterText.toLowerCase();

    const rows = [];

    this.state.films.forEach((film) => {
      if (film.title.toLowerCase().indexOf(filterText) === -1) {
        return;
      }
      rows.push(<FilmRow filmInfo={film} key={film.title} />);
    });

    return (
      <div>
        <div>{rows}</div>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    return (
      <form className="searchBar">
        <input
          type="text"
          placeholder="Search for movie.."
          value={filterText}
          onChange={(e) => this.props.onFilterTextChange(e.target.value)}
        />
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
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(FT) {
    this.setState({
      filterText: FT,
    });
  }

  render() {
    return (
      <div className="movieMain">
        <NavigationPan />
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <MovieTable
          films={this.props.films}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

ReactDOM.render(<MovieMainPage />, document.getElementById("root"));
