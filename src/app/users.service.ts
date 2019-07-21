import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Technology} from './model/technology';

// import {User} from './model/user';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get('https://ingosapi.azurewebsites.net/api/user');
    // return this.http.get('https://localhost:44383/api/user');
  }

  setRating(data: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // return this.http.post('https://localhost:44383/api/user/SetRating', JSON.stringify(data), {headers});
    return this.http.post('https://ingosapi.azurewebsites.net/api/user/SetRating', JSON.stringify(data), {headers});
  }

  registerUser(data: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('https://ingosapi.azurewebsites.net/api/user/RegisterUser', JSON.stringify(data), {headers});
  }

  updateUser(data: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('https://ingosapi.azurewebsites.net/api/user/UpdateUser', JSON.stringify(data), {headers});
  }

  login(data: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('https://ingosapi.azurewebsites.net/api/user/Login', JSON.stringify(data), {headers});
  }

  addRating(data: object) {
    // console.log(data);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // return this.http.post('https://localhost:44383/api/user/SetRating', JSON.stringify(data), {headers});
    return this.http.post('https://ingosapi.azurewebsites.net/api/user/AddRating', JSON.stringify(data), {headers});
  }

  calcRating(technology: Technology) {
    return technology.rating[0].value ? (technology.rating[0].value / technology.rating[0].count).toFixed(1) : 0;
  }

  checkLogin() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return null;
  }

}
