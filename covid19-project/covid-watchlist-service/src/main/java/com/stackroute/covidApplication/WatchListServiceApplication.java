package com.stackroute.covidApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class WatchListServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(WatchListServiceApplication.class, args);
	}

	
	
}
