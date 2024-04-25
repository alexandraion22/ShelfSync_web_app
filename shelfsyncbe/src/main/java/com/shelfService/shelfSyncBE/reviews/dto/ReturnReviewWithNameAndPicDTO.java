package com.shelfService.shelfSyncBE.reviews.dto;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReturnReviewWithNameAndPicDTO {
    private Integer review_id;
    private String profile_picture_link;
    private String name;
    private Integer book_id;
    private Integer rating;
    private String comment;

    public ReturnReviewWithNameAndPicDTO(ReturnReviewDTO returnReviewDTO) {
        this.review_id = returnReviewDTO.getReview_id();
        this.comment = returnReviewDTO.getComment();
        this.book_id = returnReviewDTO.getBook_id();
        this.rating = returnReviewDTO.getRating();
        try {
            UserRecord userRecord = FirebaseAuth.getInstance().getUser(returnReviewDTO.getUid());
            this.name = userRecord.getDisplayName();
        } catch (FirebaseAuthException e) {
            // Handle exception or set a default name
            this.name = "Unknown User";
        }

        try {
            UserRecord userRecord = FirebaseAuth.getInstance().getUser(returnReviewDTO.getUid());
            this.profile_picture_link = userRecord.getPhotoUrl();
        } catch (FirebaseAuthException e) {
            // Handle exception or set a default name
            this.profile_picture_link = "https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg";
        }
    }
}
