package com.shelfService.shelfSyncBE.books;

import com.shelfService.shelfSyncBE.books.dto.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("/books")
@SecurityRequirement(name = "Bearer Authentication")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService){
        this.bookService=bookService;
    }
    @GetMapping("/getBookByBookIdAndReaderId")
    @PreAuthorize("hasRole('READER')")
    public ResponseEntity<ReturnReaderBookWithNameDTO> getBookByReaderIdAndBookId(@RequestParam String uid, @RequestParam Integer book_id) {
        ResponseEntity<ReturnReaderBookDTO> responseEntity = bookService.getBookByBookIdAndReaderId(uid, book_id);
        ReturnReaderBookDTO returnReaderBookDTO = responseEntity.getBody();
        if (returnReaderBookDTO != null) {
            ReturnReaderBookWithNameDTO returnReaderBookWithNameDTO = new ReturnReaderBookWithNameDTO(returnReaderBookDTO);
            return new ResponseEntity<>(returnReaderBookWithNameDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, responseEntity.getStatusCode());
        }
    }

    @PreAuthorize("hasRole('AUTHOR')")
    @GetMapping("/getBookByBookIdAuthor")
    public ResponseEntity<ReturnAuthorBookDTO> getBookById(@RequestParam Integer book_id) {
        return bookService.getBookByBookIdAuthor(book_id);
    }

    @PreAuthorize("hasRole('AUTHOR')")
    @GetMapping("/getAllBooksByAuthorId")
    public ResponseEntity<List<ReturnAuthorBookDTO>> getAllBookAuthor(@RequestParam String uid) {
        return bookService.getAllBooksByAuthorId(uid);
    }

    @PreAuthorize("hasRole('READER')")
    @GetMapping("/getAllBooksByReaderId")
    public ResponseEntity<List<ReturnReaderBookWithNameDTO>> getAllBooksReader(@RequestParam String uid) {
       ResponseEntity<List<ReturnReaderBookDTO>> responseEntity = bookService.getAllBooksByReaderId(uid);
       if(responseEntity.getBody()==null)
           return new ResponseEntity<>(null, responseEntity.getStatusCode());
       List<ReturnReaderBookWithNameDTO> returnReaderBookWithNameDTOList = Objects.requireNonNull(responseEntity.getBody())
                .stream()
                .map(ReturnReaderBookWithNameDTO::new)
                .toList();
       return new ResponseEntity<>(returnReaderBookWithNameDTOList,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('AUTHOR')")
    @PostMapping("/createBook")
    public ResponseEntity<String> createBook(@Valid @RequestBody AddBookDTO addBookDTO) {
        return bookService.createBook(addBookDTO);
    }

    @PreAuthorize("hasRole('AUTHOR')")
    @PutMapping("/updateBookById")
    public ResponseEntity<String> updateBook(@Valid @RequestBody UpdateBookDTO updateBookDTO) {
        return bookService.updateBookById(updateBookDTO);
    }

    @PreAuthorize("hasRole('AUTHOR')")
    @DeleteMapping("/deleteBookById")
    public ResponseEntity<Void> deleteBookById(@RequestParam Integer book_id) {
        return bookService.deleteBookById(book_id);
    }
}