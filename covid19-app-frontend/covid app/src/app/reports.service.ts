import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { ICountriesMasterResponseData } from './common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http:HttpClient) { }

  public covid19Reports() : Observable<ICountriesMasterResponseData[]>{
    return this.http.get<any[]>("http://localhost:8888/countries/country?page=0");
  }
  
}
