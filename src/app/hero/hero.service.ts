import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../core/model';
import { HttpClient } from '@angular/common/http';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class HeroService {

  constructor(private http: HttpClient) { }

  get() : Observable<Hero[]> {
      return this.http.get<Hero[]>('api/heroes');
  }

}
