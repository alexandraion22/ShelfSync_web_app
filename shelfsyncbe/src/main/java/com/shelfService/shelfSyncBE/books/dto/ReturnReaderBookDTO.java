package com.shelfService.shelfSyncBE.books.dto;
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
}
