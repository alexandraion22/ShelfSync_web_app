package com.shelfService.shelfSyncBE.reviews.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReturnReviewDTO {
    private Integer review_id;
    private String uid;
    private Integer book_id;
    private Integer rating;
    private String comment;
}
