import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { Country } from '../models/country.model';
import { State } from '../models/state.model';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  public getCountries(): Observable<Country[]> {
    return new Observable(observer => {
      this.http.get('assets/data.json').subscribe((res: any) => {
        observer.next(res.countries);
      });
    });
  }

  public getStates(countryId: number): Observable<State[]> {
    return new Observable(observer => {
      this.http.get('assets/data.json').subscribe((res: any) => {
        const states = res.states.filter((state: any) => {
          return state.countryId === countryId;
        });
        observer.next(states);
      });
    });
  }
}
