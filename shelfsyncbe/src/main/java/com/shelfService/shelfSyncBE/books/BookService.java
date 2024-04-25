package com.shelfService.shelfSyncBE.books;

import com.shelfService.shelfSyncBE.books.dto.AddBookDTO;
import com.shelfService.shelfSyncBE.books.dto.ReturnAuthorBookDTO;
import com.shelfService.shelfSyncBE.books.dto.ReturnReaderBookDTO;
import com.shelfService.shelfSyncBE.books.dto.UpdateBookDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BookService {
    ResponseEntity<ReturnReaderBookDTO> getBookByBookIdAndReaderId(String uid, Integer bookId);
    ResponseEntity<ReturnAuthorBookDTO> getBookByBookIdAuthor(Integer bookId);
    ResponseEntity<List<ReturnAuthorBookDTO>> getAllBooksByAuthorId(String uid);
    ResponseEntity<List<ReturnReaderBookDTO>> getAllBooksByReaderId(String uid);
    ResponseEntity<String> createBook(AddBookDTO addBookDTO);
    ResponseEntity<String> updateBookById(UpdateBookDTO updateBookDTO);
    ResponseEntity<Void> deleteBookById(Integer bookId);
}
