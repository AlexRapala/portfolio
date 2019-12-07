import { observable, action, reaction } from 'mobx';
import ApiClient from '../ApiClient';
class UserStore {

  @observable token = window.localStorage.getItem('jwt');
  @observable isAuthenticated = null;
  @observable user = null;
  @observable loading = false;
  @observable errors = [];
  @observable selectedKeys = [];

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

  @action setSelectedKeys(arr) {
    this.selectedKeys = arr;
  }

  @action getUser() {
    if(this.token) {
      ApiClient.User.get()
      .then(data => {
        if(data) {
          this.user = data;
          this.isAuthenticated = true;
        }
        else {
          this.isAuthenticated = false;
        }
      })
    }
    else {
      this.isAuthenticated = false;
    }
  }

  @action logout() {
    fetch('ticker/auth/logout/', {
      method: "POST",
      headers: {
        "Content-Type":"application/x-www-form-urlencoded",
        "Authorization": `Token ${this.token}`,
      }
    })
    .then(data => {
        window.localStorage.removeItem('jwt');
        this.token = null;
        this.isAuthenticated = false;
    });

  }

  @action login(username, password) {
    this.loading = true;
    return fetch('http://localhost:8000/ticker/auth/login/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({'username': username, 'password': password})
      })
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        else {
          return Promise.reject({ status: response.status, statusText: response.statusText });
        }
      })
      .catch(err => {
        if (err.status === 400)
          this.errors = ['Wrong username or password'];
      })
      .then(data => {
        if(data) {
          window.localStorage.setItem('jwt', data['token']);
          this.token = window.localStorage.getItem('jwt');
          this.isAuthenticated = true;
        }
      })
    }
}

export default new UserStore();