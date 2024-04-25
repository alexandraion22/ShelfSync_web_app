package com.shelfService.shelfSyncDB.books;

import com.shelfService.shelfSyncDB.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findAllByUser(User user);
}
