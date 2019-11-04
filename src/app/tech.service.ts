import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TechService {

  // apiUrl = 'https://localhost:44383/api';
  apiUrl = 'https://ingos.herokuapp.com/api';

  constructor(private http: HttpClient) {
  }

  getTechnologies() {
    return this.http.get(`${this.apiUrl}/tech`);
    // return this.http.get('https://localhost:44383/api/user');
  }

  addTechnology(data: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/tech`, JSON.stringify(data), {headers});
  }
}
