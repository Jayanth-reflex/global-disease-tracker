package com.covid.externalapi.controller;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/countries")
public class Controller {
	@Autowired
	private RestTemplate restTemplate;

	@GetMapping("/country")
	@CrossOrigin("*")
	public ResponseEntity<String> get(@RequestParam(name = "page", required = true) int page,
			@RequestParam(name = "countries", required = false) String country,
			@RequestParam(name = "infected", required = false) String infected,
			@RequestParam(name = "deceased", required = false) String deceased,
			@RequestParam(name = "tested", required = false) String tested,
			@RequestParam(name = "recovered", required = false) String recovered) {
		String queryappend = "";
		if (!StringUtils.isEmpty(country)) {
			queryappend = queryappend + "&country=" + country;
		}
		if (!StringUtils.isEmpty(infected)) {
			queryappend = queryappend + "&infected=" + infected;
		}
		if (!StringUtils.isEmpty(recovered)) {
			queryappend = queryappend + "&recovered=" + recovered;
		}
		if (!StringUtils.isEmpty(deceased)) {
			queryappend = queryappend + "&deceased=" + deceased;
		}
		System.out.println(queryappend);

		return restTemplate.getForEntity(
				"https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true?page="
						+ page + "" + queryappend,
				String.class);
	}
}
