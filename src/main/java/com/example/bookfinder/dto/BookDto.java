package com.example.bookfinder.dto;

import java.util.List;

public class BookDto {
    public String title;
    public List<String> authors;
    public String publisher;
    public String publishedDate;
    public String description;
    public String pageCount;
    public String averageRating;
    public ImageDto imageLinks;
    public String previewLink;
    public String infoLink;

    public BookDto() {
    }
}
