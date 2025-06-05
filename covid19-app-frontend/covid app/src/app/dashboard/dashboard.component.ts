import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core'
import { MatInputModule } from '@angular/material/input';
import { ICountriesMasterResponseData } from '../common/interfaces';
import { map, filter, switchMap } from 'rxjs/operators';
import { Table } from 'primeng/table'
import { ReportsService } from '../reports.service';
import { WishlistService } from '../wishlist.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  countriesDataList : ICountriesMasterResponseData[] = [];
  
  loading: boolean = true;

  isLoadingError: boolean = false;
  isTableLoading: boolean = false;
  @ViewChild('dt2') dt: Table | undefined;

  constructor(private service:ReportsService, private wishListService : WishlistService, route : Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllReports();
  }

  public getAllReports(){
    this.isTableLoading = true;
    this.service.covid19Reports().pipe(
      map(res => res.map(item => ({infected: item.infected, 
        tested: item.tested,
        recovered: item.recovered,
        deceased: item.deceased,
        country: item.country,
        moreData: item.moreData,
        historyData: item.historyData,
        sourceUrl: item.sourceUrl,
        lastUpdatedApify: item.lastUpdatedApify

      })))
  ).subscribe(res => {
    console.log("data "+ res);
    this.countriesDataList = res;
    this.loading = false;
    this.isTableLoading = false;
  });
  }

  applyFilterGlobal($event : any, stringVal : string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  addToWishList(infected : number, tested : number, recovered : number, deceased : number, 
    country : string, moreData : string, historyData : string, sourceUrl : string, 
    lastUpdateApify : string){
    
      if(sessionStorage.getItem("username") != null){
        this.wishListService.addToWishList(infected,
          tested,
          recovered,
          deceased,
          country,
          moreData,
          historyData,
          sourceUrl,
          lastUpdateApify, sessionStorage.getItem("username")).subscribe((data: { message: any; }) => {
            this.toastr.success(data.message);
          });
      } else {
        this.toastr.warning("You should login first, before adding an item into wishlist");
      }
  
  }

}