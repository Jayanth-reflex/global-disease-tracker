import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { IWishListMasterResponseData } from './common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistStatus! : string;
  constructor(private http:HttpClient) { }

  public addToWishList(infected : number, tested : number, recovered : number, deceased : number, 
    country : string, moreData : string, historyData : string, sourceUrl : string, 
    lastUpdateApify : string, username : string | null) : any {

    return this.http.post<any>("http://localhost:8083/wishlist/save", { infected : infected, tested : tested, recovered : recovered, deceased : deceased, 
      country : country, moreData : moreData, historyData : historyData, sourceUrl : sourceUrl, lastUpdateApify : lastUpdateApify, username : username });
  }

  public getWishlistOfUser(username : string | null) : Observable<IWishListMasterResponseData[]>{
      return this.http.get<any[]>("http://localhost:8083/wishlist/get/" + username);
  }
}
