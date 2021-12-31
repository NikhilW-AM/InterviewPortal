import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  private _url = 'http://interviewapi.stgbuild.com/getQuizData';
  getJsonDetails() {
    return this.http.get(this._url);
  }
}
