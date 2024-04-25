package com.shelfService.shelfSyncBE.reviews;

import com.shelfService.shelfSyncBE.reviews.dto.AddReviewDTO;
import com.shelfService.shelfSyncBE.reviews.dto.ReturnReviewDTO;
import com.shelfService.shelfSyncBE.reviews.dto.UpdateReviewDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReviewService {
    ResponseEntity<ReturnReviewDTO> getReviewByReviewId(Integer reviewId);
    ResponseEntity<ReturnReviewDTO> getReviewByUidAndBookId(String uid, Integer bookId);
    ResponseEntity<List<ReturnReviewDTO>> getAllReviewsByBookId(Integer bookId);
    ResponseEntity<String> createReview(AddReviewDTO addReviewDTO);
    ResponseEntity<String> updateReview(UpdateReviewDTO updateReviewDTO);
    ResponseEntity<Void> deleteReviewById(Integer reviewId);
}
