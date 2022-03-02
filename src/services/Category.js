import axios from "axios";

const categoryApi = "http://localhost:8080/Home/Category";

class CategoryService {
  getCategory() {
    return axios.get(categoryApi);
  }
}

export default new CategoryService();
