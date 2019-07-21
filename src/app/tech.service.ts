import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TechService {

  constructor(private http: HttpClient) {
  }

  getTechnologies() {
    return this.http.get('https://ingosapi.azurewebsites.net/api/tech');
    // return this.http.get('https://localhost:44383/api/user');
  }

  addTechnology(data: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('https://ingosapi.azurewebsites.net/api/tech', JSON.stringify(data), {headers});
  }
}
