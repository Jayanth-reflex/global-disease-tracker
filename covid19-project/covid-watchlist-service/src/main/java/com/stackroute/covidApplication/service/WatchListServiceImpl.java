package com.stackroute.covidApplication.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.stackroute.covidApplication.dao.WatchListRepository;
import com.stackroute.covidApplication.model.WatchList;

@Service
public class WatchListServiceImpl implements WatchListService {
	private WatchListRepository watchListRepository;

    public WatchListServiceImpl(WatchListRepository watchListRepository) {
        this.watchListRepository = watchListRepository;
    }
    

    public WatchList save(WatchList watchList)  {
    	WatchList wl = null;
    	WatchList list = watchListRepository.findByCountryAndUsername(watchList.getCountry(), watchList.getUsername());
    	if(list == null) {
    		wl =	watchListRepository.save(watchList);
    	}
    	return wl;
    }

    public List<WatchList> getWatchListForUser(String username) {
        return watchListRepository.findByUsername(username);
    }

}
