package com.shelfService.shelfSyncDB.reviews.dto;

import com.shelfService.shelfSyncDB.reviews.Review;
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

    public ReturnReviewDTO(Review review){
        this.review_id = review.getReviewId();
        this.uid = review.getUser().getUid();
        this.book_id = review.getBook().getBookId();
        this.rating = review.getRating();
        this.comment = review.getComment();
    }
}
