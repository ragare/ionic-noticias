import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getTopHeadlines() {
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=ve&apiKey=01cea6bafbff4ebfa395571407f96d35`);
  }
}
