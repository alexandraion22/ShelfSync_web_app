package com.shelfService.shelfSyncDB.list_elements;

import com.shelfService.shelfSyncDB.books.Book;
import com.shelfService.shelfSyncDB.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListElementRepository extends JpaRepository<ListElement, Integer> {
    ListElement findByUserAndBook(User user, Book book);
}
