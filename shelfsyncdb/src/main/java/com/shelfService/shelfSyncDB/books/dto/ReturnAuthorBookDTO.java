package com.shelfService.shelfSyncDB.books.dto;

import com.shelfService.shelfSyncDB.books.Book;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReturnAuthorBookDTO {
    private Integer book_id;
    private String title;
    private String description;
    private Integer pages;
    private Integer category1_id;
    private Integer category2_id;
    private Integer category3_id;
    private String cover_link;
    private Double rating;
    private Integer ratingNo;

    public ReturnAuthorBookDTO(Book book, Double rating, Integer ratingNo){
        this.book_id = book.getBookId();
        this.title = book.getTitle();
        this.description = book.getDescription();
        this.pages = book.getPages();
        this.category1_id = book.getCategory1().getCategoryId();
        this.category2_id = book.getCategory2().getCategoryId();
        this.category3_id = book.getCategory3().getCategoryId();
        this.cover_link = book.getCover_link();
        this.rating = rating;
        this.ratingNo = ratingNo;
    }
}
