package com.shelfService.shelfSyncBE.books.dto;

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
}
