package com.shelfService.shelfSyncDB.reviews;

import com.shelfService.shelfSyncDB.books.Book;
import com.shelfService.shelfSyncDB.books.BookRepository;
import com.shelfService.shelfSyncDB.feedbacks.Feedback;
import com.shelfService.shelfSyncDB.feedbacks.dto.ReturnFeedbackDTO;
import com.shelfService.shelfSyncDB.reviews.dto.ReturnReviewDTO;
import com.shelfService.shelfSyncDB.users.User;
import com.shelfService.shelfSyncDB.users.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shelfService.shelfSyncDB.reviews.dto.AddReviewDTO;
import com.shelfService.shelfSyncDB.reviews.dto.UpdateReviewDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;

    private final UserRepository userRepository;

    public ReviewController(ReviewRepository reviewRepository, BookRepository bookRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/getReviewById")
    public ResponseEntity<ReturnReviewDTO> getReviewByUid(@RequestParam Integer review_id) {
        Optional<Review> optionalReview = reviewRepository.findById(review_id);
        if (optionalReview.isPresent())
            return new ResponseEntity<>(new ReturnReviewDTO(optionalReview.get()), HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getReviewByUidAndBookId")
    public ResponseEntity<ReturnReviewDTO> getReviewByUid(@RequestParam String uid, Integer bookId) {
        User user = userRepository.findByUid(uid);
        Optional <Book> book = bookRepository.findById(bookId);
        if(user == null || book.isEmpty())
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        Review review = reviewRepository.findByUserAndBook(user,book.get());
        if(review != null)
            return new ResponseEntity<>(new ReturnReviewDTO(review), HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getReviewsByBookId")
    public ResponseEntity<List<ReturnReviewDTO>> getReviewsByBookId(Integer bookId) {
        Optional <Book> book = bookRepository.findById(bookId);
        if(book.isEmpty())
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        List<ReturnReviewDTO> returnReviewDTOS = reviewRepository.findAllByBook(book.get())
                .stream()
                .map(ReturnReviewDTO::new)
                .toList();
        return new ResponseEntity<>(returnReviewDTOS,HttpStatus.OK);
    }

    @PostMapping("/createReview")
    public ResponseEntity<String> createReview(@RequestBody AddReviewDTO addReviewDTO) {
        Optional<Book> optionalBook = bookRepository.findById(addReviewDTO.getBook_id());
        User optionalUser = userRepository.findByUid(addReviewDTO.getUid());

        if(optionalBook.isEmpty())
            return new ResponseEntity<>("Book not found", HttpStatus.NOT_FOUND);
        if(optionalUser == null)
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);

        if(reviewRepository.findByUserAndBook(optionalUser,optionalBook.get())!=null)
            return new ResponseEntity<>("Review already exists", HttpStatus.BAD_REQUEST);
        
        Review review = new Review(addReviewDTO.getRating(), addReviewDTO.getComment(),optionalUser, optionalBook.get());
        reviewRepository.save(review);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/updateReviewById")
    public ResponseEntity<String> updateReview(@RequestBody UpdateReviewDTO updateReviewDTO) {
        Optional<Review>  optionalReview = reviewRepository.findById(updateReviewDTO.getReview_id());
        if(optionalReview.isEmpty())
            return new ResponseEntity<>("Review not found", HttpStatus.NOT_FOUND);

        Review review = optionalReview.get();

        // Set fields
        review.setRating(updateReviewDTO.getRating());
        review.setComment(updateReviewDTO.getComment());
        review.setDate_modified(LocalDate.now());

        reviewRepository.save(review);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteReviewById")
    public ResponseEntity<Void> deleteReviewById(@RequestParam Integer review_id) {
        Optional<Review>  optionalReview = reviewRepository.findById(review_id);
        if(optionalReview.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        reviewRepository.deleteById(review_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
