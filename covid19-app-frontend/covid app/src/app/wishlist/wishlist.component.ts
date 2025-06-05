import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { map } from 'rxjs/operators';
import { IWishListMasterResponseData } from '../common/interfaces';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishList! : IWishListMasterResponseData[];
  constructor(private wishListService : WishlistService) { }

  ngOnInit(): void {
    this.loadWishListForCurrentUser();
  }

  public loadWishListForCurrentUser(){
    this.wishListService.getWishlistOfUser(sessionStorage.getItem("username")).pipe(
      map(res => res.map(item => ({infected: item.infected, 
        tested: item.tested,
        recovered: item.recovered,
        deceased: item.deceased,
        country: item.country,
        moreData: item.moreData,
        historyData: item.historyData,
        sourceUrl: item.sourceUrl,
        lastUpdatedApify: item.lastUpdatedApify,
        username : item.username
      })))
  ).subscribe(res => {
    console.log("data "+ res);
    this.wishList = res;
  });
  }

}
