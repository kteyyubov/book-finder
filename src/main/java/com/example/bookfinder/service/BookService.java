package com.example.bookfinder.service;

import com.example.bookfinder.dto.BookSearchInfoDto;
import com.example.bookfinder.dto.DataSetDto;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class BookService {

    private final RestTemplate restTemplate;
    private final Environment env;

    public BookService(RestTemplate restTemplate, Environment env) {
        this.restTemplate = restTemplate;
        this.env = env;
    }

    public BookSearchInfoDto getBook(String id)
    {
        String url = UriComponentsBuilder.fromHttpUrl(env.getProperty("app.google-book-api.url"))
                .path("/volumes")
                .path('/' + id)
                .build()
                .toUriString();

        ResponseEntity<BookSearchInfoDto> result = restTemplate.getForEntity(url, BookSearchInfoDto.class);

        return result.getBody();
    }

    public DataSetDto getBooks(String query, Integer startIndex, Integer maxResults)
    {
        String url = UriComponentsBuilder.fromHttpUrl(env.getProperty("app.google-book-api.url"))
                .path("/volumes")
                .queryParam("q", query)
                .queryParam("startIndex", startIndex * maxResults)
                .queryParam("maxResults", maxResults)
                .build()
                .toUriString();

        ResponseEntity<DataSetDto> result = restTemplate.getForEntity(url, DataSetDto.class);

        return result.getBody();
    }
}