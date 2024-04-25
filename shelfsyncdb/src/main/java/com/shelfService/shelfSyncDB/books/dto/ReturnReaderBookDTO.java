package com.shelfService.shelfSyncDB.books.dto;

import com.shelfService.shelfSyncDB.books.Book;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReturnReaderBookDTO {
    private Integer book_id;
    private String uid;
    private String title;
    private String description;
    private Integer pages;
    private Integer category1_id;
    private Integer category2_id;
    private Integer category3_id;
    private String cover_link;
    private Integer current_progress;
    private String progress;
    private Integer listElement_id;
    private Double rating;
    private Integer ratingNo;

    public ReturnReaderBookDTO(Book book, Integer current_progress, String progress, Integer listElement_id, Double rating, Integer ratingNo){
        this.book_id = book.getBookId();
        this.uid = book.getUser().getUid();
        this.title = book.getTitle();
        this.description = book.getDescription();
        this.pages = book.getPages();
        this.category1_id = book.getCategory1().getCategoryId();
        this.category2_id = book.getCategory2().getCategoryId();
        this.category3_id = book.getCategory3().getCategoryId();
        this.cover_link = book.getCover_link();
        this.current_progress = current_progress;
        this.progress = progress;
        this.listElement_id = listElement_id;
        this.rating = rating;
        this.ratingNo = ratingNo;
    }
}
