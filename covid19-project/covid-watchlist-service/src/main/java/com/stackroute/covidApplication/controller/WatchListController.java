package com.stackroute.covidApplication.controller;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.covidApplication.model.WatchList;
import com.stackroute.covidApplication.service.WatchListService;


@RestController
@RequestMapping("/wishlist")
public class WatchListController {
	
    private WatchListService watchListService;
    
    public WatchListController(WatchListService watchListService) {
        this.watchListService = watchListService;
    }

    @CrossOrigin("*")
    @PostMapping("/save")
    public ResponseEntity<?> saveWatchList(@RequestBody WatchList watchList)  {
    	Map<String, String> map = new HashMap<String, String>();
    	WatchList wl = watchListService.save(watchList);
    	if(wl != null) {
    		map.put("message", "Added to Wishlist successfully");
    	} else {
    		map.put("message", "Item already added the Wishlist");
    	}
    	return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping("/get/{username}")
    public List<WatchList> getWatchList(@PathVariable String username) {
        return watchListService.getWatchListForUser(username);
    }

}
