package com.shelfService.shelfSyncDB.reviews;

import com.shelfService.shelfSyncDB.books.Book;
import com.shelfService.shelfSyncDB.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Review findByUserAndBook(User user, Book book);
    List<Review> findAllByBook(Book book);
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.book.bookId = :bookId")
    Double getAverageRatingForBook(@Param("bookId") Integer bookId);
    @Query("SELECT COUNT(r) FROM Review r WHERE r.book.bookId = :bookId")
    Integer getNumberOfReviewsForBook(@Param("bookId") Integer bookId);
}
