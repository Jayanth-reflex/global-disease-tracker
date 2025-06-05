package com.stackroute.covidApplication.model;




import javax.persistence.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "watchlist")
@Entity
public class WatchList {
	
    private Object infected;
    private Object tested;
    private Object recovered;
    private Object deceased;
    private String country;
    private String moreData;
    private String historyData;
    private String sourceUrl;
    private String lastUpdateApify;
    private String username;
	
	public Object getInfected() {
		return infected;
	}
	public void setInfected(Object infected) {
		this.infected = infected;
	}
	public Object getTested() {
		return tested;
	}
	public void setTested(Object tested) {
		this.tested = tested;
	}
	public Object getRecovered() {
		return recovered;
	}
	public void setRecovered(Object recovered) {
		this.recovered = recovered;
	}
	public Object getDeceased() {
		return deceased;
	}
	public void setDeceased(Object deceased) {
		this.deceased = deceased;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getMoreData() {
		return moreData;
	}
	public void setMoreData(String moreData) {
		this.moreData = moreData;
	}
	public String getHistoryData() {
		return historyData;
	}
	public void setHistoryData(String historyData) {
		this.historyData = historyData;
	}
	public String getSourceUrl() {
		return sourceUrl;
	}
	public void setSourceUrl(String sourceUrl) {
		this.sourceUrl = sourceUrl;
	}
	public String getLastUpdateApify() {
		return lastUpdateApify;
	}
	public void setLastUpdateApify(String lastUpdateApify) {
		this.lastUpdateApify = lastUpdateApify;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
}
