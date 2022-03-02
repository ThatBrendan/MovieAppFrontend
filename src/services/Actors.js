import axios from "axios";

const actorApi = "http://localhost:8080/Home/Actors";

class ActorServices {
  getActors() {
    return axios.get(actorApi);
  }
}

export default new ActorServices();
