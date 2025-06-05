package com.stackroute.covidApplication.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stackroute.covidApplication.model.WatchList;

public interface WatchListService {

	public WatchList save(WatchList watchList);

	public List<WatchList> getWatchListForUser(String username);
}
