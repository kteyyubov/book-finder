package com.example.bookfinder.controller;

import com.example.bookfinder.service.BookService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class WebController {

    private final BookService bookService;

    public WebController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping(value = "/")
    public String homepage() {
        return "index";
    }

    @GetMapping(value = "/books/{id}")
    public String viewBookInfo(@PathVariable String id, Model model) {

        model.addAttribute("book", bookService.getBook(id));

        return "book-info";
    }
}