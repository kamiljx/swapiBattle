import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable(
  {
    providedIn: 'root'
  }
)

export class EndpointsService {
  #http: HttpClient = inject(HttpClient);

  public getPeopleBattle(id?: number | undefined): Observable<any> {
    return this.#http.get(`https://swapi.dev/api/people/${id ?? ''}`);
  }
  public getStarshipBattle(id?: number | undefined): Observable<any> {
    return this.#http.get(`https://swapi.dev/api/starships/${id ?? ''}`);
  }
}
