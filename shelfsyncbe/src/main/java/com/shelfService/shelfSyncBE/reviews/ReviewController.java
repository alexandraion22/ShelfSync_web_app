package com.shelfService.shelfSyncBE.reviews;
import com.shelfService.shelfSyncBE.reviews.dto.AddReviewDTO;
import com.shelfService.shelfSyncBE.reviews.dto.ReturnReviewDTO;
import com.shelfService.shelfSyncBE.reviews.dto.ReturnReviewWithNameAndPicDTO;
import com.shelfService.shelfSyncBE.reviews.dto.UpdateReviewDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("/reviews")
@SecurityRequirement(name = "Bearer Authentication")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/getReviewById")
    @PreAuthorize("hasRole('AUTHOR') OR hasRole('READER')")
    public ResponseEntity<ReturnReviewWithNameAndPicDTO> getReviewByUid(@RequestParam Integer review_id) {
       ResponseEntity<ReturnReviewDTO> responseEntity = reviewService.getReviewByReviewId(review_id);
       ReturnReviewDTO returnReviewDTO= responseEntity.getBody();
            if (returnReviewDTO != null) {
                ReturnReviewWithNameAndPicDTO returnReviewWithNameAndPicDTO = new ReturnReviewWithNameAndPicDTO(returnReviewDTO);
                return new ResponseEntity<>(returnReviewWithNameAndPicDTO, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, responseEntity.getStatusCode());
            }
    }

    @GetMapping("/getReviewByUidAndBookId")
    @PreAuthorize("hasRole('READER')")
    public ResponseEntity<ReturnReviewWithNameAndPicDTO> getReviewByUid(@RequestParam String uid, Integer bookId) {
        ResponseEntity<ReturnReviewDTO> responseEntity = reviewService.getReviewByUidAndBookId(uid, bookId);
        ReturnReviewDTO returnReviewDTO= responseEntity.getBody();
        if (returnReviewDTO != null) {
            ReturnReviewWithNameAndPicDTO returnReviewWithNameAndPicDTO = new ReturnReviewWithNameAndPicDTO(returnReviewDTO);
            return new ResponseEntity<>(returnReviewWithNameAndPicDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, responseEntity.getStatusCode());
        }
    }

    @GetMapping("/getReviewsByBookId")
    @PreAuthorize("hasRole('AUTHOR') OR hasRole('READER')")
    public ResponseEntity<List<ReturnReviewWithNameAndPicDTO>> getReviewsByBookId(Integer bookId) {
        ResponseEntity<List<ReturnReviewDTO>> responseEntity = reviewService.getAllReviewsByBookId(bookId);
        if(responseEntity.getBody()==null)
            return new ResponseEntity<>(null, responseEntity.getStatusCode());
        List<ReturnReviewWithNameAndPicDTO> returnReviewWithNameAndPicDTOList= Objects.requireNonNull(responseEntity.getBody())
                .stream()
                .map(ReturnReviewWithNameAndPicDTO::new)
                .toList();
        return new ResponseEntity<>(returnReviewWithNameAndPicDTOList, HttpStatus.OK);
    }

    @PostMapping("/createReview")
    @PreAuthorize("hasRole('READER')")
    public ResponseEntity<String> createReview(@RequestBody AddReviewDTO addReviewDTO) {
       return reviewService.createReview(addReviewDTO);
    }

    @PutMapping("/updateReviewById")
    @PreAuthorize("hasRole('READER')")
    public ResponseEntity<String> updateReview(@RequestBody UpdateReviewDTO updateReviewDTO) {
       return reviewService.updateReview(updateReviewDTO);
    }

    @DeleteMapping("/deleteReviewById")
    @PreAuthorize("hasRole('READER')")
    public ResponseEntity<Void> deleteReviewById(@RequestParam Integer review_id) {
        return reviewService.deleteReviewById(review_id);
    }

}
