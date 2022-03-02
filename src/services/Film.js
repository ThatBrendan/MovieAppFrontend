import axios from "axios";

const filmApi = "http://localhost:8080/Home/Films";

class FilmService {
  getFilms() {
    return axios.get(filmApi);
  }
}

export default new FilmService();
