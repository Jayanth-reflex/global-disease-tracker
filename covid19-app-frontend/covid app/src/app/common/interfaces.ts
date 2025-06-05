export interface ICountriesMasterResponseData {
infected: number;
tested: string;
recovered: number;
deceased: number;
country: string;
moreData: string;
historyData: string;
sourceUrl:string;
lastUpdatedApify:string;
}

export interface IWishListMasterResponseData {
    infected: number;
    tested: string;
    recovered: number;
    deceased: number;
    country: string;
    moreData: string;
    historyData: string;
    sourceUrl:string;
    lastUpdatedApify:string;
    username : string;
}