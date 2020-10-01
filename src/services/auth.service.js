import axios from "axios";

const API_URL = "http://10.0.0.186:8080/api/auth/";


class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  save(saved, username) {
    return axios.put('http://localhost:8080/saved', { saved, username })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  unsave(saved, username) {
    return axios.delete('http://localhost:8080/saved', { saved, username })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  async getSaved(username) {
    console.log(username)
    return await axios.post('http://localhost:8080/saved', username)
      .then(response => {
        localStorage.setItem('saved', JSON.stringify(response.data.saved));
      })
    
  }

  displaySaved() {
    if (localStorage.getItem('saved')) {
      return JSON.parse(localStorage.getItem('saved'))
    } else {
      return ''
    }
    
  }

  logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("saved");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();