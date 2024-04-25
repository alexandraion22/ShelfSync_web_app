package com.shelfService.shelfSyncDB.books;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.shelfService.shelfSyncDB.books.dto.ReturnAuthorBookDTO;
import com.shelfService.shelfSyncDB.books.dto.ReturnReaderBookDTO;
import com.shelfService.shelfSyncDB.list_elements.ListElement;
import com.shelfService.shelfSyncDB.list_elements.ListElementRepository;
import com.shelfService.shelfSyncDB.reviews.ReviewRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shelfService.shelfSyncDB.books.dto.AddBookDTO;
import com.shelfService.shelfSyncDB.books.dto.UpdateBookDTO;
import com.shelfService.shelfSyncDB.categories.Category;
import com.shelfService.shelfSyncDB.categories.CategoryRepository;
import com.shelfService.shelfSyncDB.users.User;
import com.shelfService.shelfSyncDB.users.UserRepository;

@RestController
@RequestMapping("/books")
public class BookController {
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ListElementRepository listElementRepository;

    private final ReviewRepository reviewRepository;

    public BookController(BookRepository bookRepository, UserRepository userRepository,
                          CategoryRepository categoryRepository, ListElementRepository listElementRepository, ReviewRepository reviewRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.listElementRepository = listElementRepository;
        this.reviewRepository = reviewRepository;
    }

    @GetMapping("/getBookByBookIdAndReaderId")
    public ResponseEntity<ReturnReaderBookDTO> getBookByReaderIdAndBookId(@RequestParam String uid, @RequestParam Integer book_id) {
        User user = userRepository.findByUid(uid);
        if(user == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        Optional<Book> optionalBook = bookRepository.findById(book_id);
        if (optionalBook.isEmpty())
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        Integer currentPages = 0;
        String progress = "nr";
        Integer listElement_id = -1;
        ListElement listElement = listElementRepository.findByUserAndBook(user, optionalBook.get());
        if (listElement != null) {
            currentPages = listElement.getCurrent_pages();
            progress = listElement.getProgress();
            listElement_id = listElement.getElementId();
        }
        Double rating = reviewRepository.getAverageRatingForBook(book_id);
        Integer reviews = reviewRepository.getNumberOfReviewsForBook(book_id);
        return new ResponseEntity<>(new ReturnReaderBookDTO(optionalBook.get(),currentPages,progress,listElement_id, rating, reviews),HttpStatus.OK);
    }

    @GetMapping("/getBookByBookIdAuthor")
    public ResponseEntity<ReturnAuthorBookDTO> getBookById(@RequestParam Integer book_id) {
        Optional<Book> optionalBook = bookRepository.findById(book_id);
        if (optionalBook.isPresent())
            {
            Double rating = reviewRepository.getAverageRatingForBook(book_id);
            Integer reviews = reviewRepository.getNumberOfReviewsForBook(book_id);
            return new ResponseEntity<>(new ReturnAuthorBookDTO(optionalBook.get(),rating,reviews), HttpStatus.OK);
            }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getAllBooksByAuthorId")
    public ResponseEntity<List<ReturnAuthorBookDTO>> getAllBookAuthor(@RequestParam String uid) {
        User user = userRepository.findByUid(uid);
        if(user == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        List<Book> books = bookRepository.findAll();
        List<ReturnAuthorBookDTO> returnAuthorBookDTOS = new ArrayList<>();
        for (Book book: books){
            Double rating = reviewRepository.getAverageRatingForBook(book.getBookId());
            Integer reviews = reviewRepository.getNumberOfReviewsForBook(book.getBookId());
            returnAuthorBookDTOS.add(new ReturnAuthorBookDTO(book,rating,reviews));
        }
        return new ResponseEntity<>(returnAuthorBookDTOS,HttpStatus.OK);
    }

    @GetMapping("/getAllBooksByReaderId")
    public ResponseEntity<List<ReturnReaderBookDTO>> getAllBooksReader(@RequestParam String uid) {
        User user = userRepository.findByUid(uid);
        if(user == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        List<Book> books = bookRepository.findAll();
        List<ReturnReaderBookDTO> returnReaderBookDTOS = new ArrayList<>();
        for (Book book: books){
            Integer currentPages = 0;
            String progress = "nr";
            Integer listElement_id = -1;
            ListElement listElement = listElementRepository.findByUserAndBook(user, book);
            if (listElement != null) {
                currentPages = listElement.getCurrent_pages();
                progress = listElement.getProgress();
                listElement_id = listElement.getElementId();
            }
            Double rating = reviewRepository.getAverageRatingForBook(book.getBookId());
            Integer reviews = reviewRepository.getNumberOfReviewsForBook(book.getBookId());
            returnReaderBookDTOS.add(new ReturnReaderBookDTO(book,currentPages,progress,listElement_id,rating,reviews));
        }
        return new ResponseEntity<>(returnReaderBookDTOS,HttpStatus.OK);
    }

    @PostMapping("/createBook")
    public ResponseEntity<String> createBook(@RequestBody AddBookDTO addBookDTO) {

        User user = userRepository.findByUid(addBookDTO.getUid());

        // Retrieve categories
        Optional<Category> optionalCategory1 = categoryRepository.findById(addBookDTO.getCategory1_id());
        Optional<Category> optionalCategory2 = categoryRepository.findById(addBookDTO.getCategory2_id());
        Optional<Category> optionalCategory3 = categoryRepository.findById(addBookDTO.getCategory3_id());

        // Check if all required categories exist
        if (optionalCategory1.isEmpty() || optionalCategory2.isEmpty() || optionalCategory3.isEmpty()) {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

        // Validate user
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        // Create and populate the book
        Book book = new Book(addBookDTO.getTitle(),
                addBookDTO.getDescription(),
                addBookDTO.getPages(),
                addBookDTO.getCover_link(),
                user,
                optionalCategory1.get(),
                optionalCategory2.get(),
                optionalCategory3.get()
                );

        bookRepository.save(book);
        return new ResponseEntity<>("Added book", HttpStatus.CREATED);

    }

    @PutMapping("/updateBookById")
    public ResponseEntity<String> updateBook(@RequestBody UpdateBookDTO updateBookDTO) {

        Optional<Book> optionalBook = bookRepository.findById(updateBookDTO.getBook_id());

        if (optionalBook.isEmpty())
            return new ResponseEntity<>("Book not found", HttpStatus.NOT_FOUND);

        // Retrieve categories
        Optional<Category> optionalCategory1 = categoryRepository.findById(updateBookDTO.getCategory1_id());
        Optional<Category> optionalCategory2 = categoryRepository.findById(updateBookDTO.getCategory2_id());
        Optional<Category> optionalCategory3 = categoryRepository.findById(updateBookDTO.getCategory3_id());

        // Check if all required categories exist
        if (optionalCategory1.isEmpty() || optionalCategory2.isEmpty() || optionalCategory3.isEmpty()) {
            return new ResponseEntity<>("Category not found", HttpStatus.NOT_FOUND);
        }

        Book book = optionalBook.get();

        // Set fields
        book.setTitle(updateBookDTO.getTitle());
        book.setDescription(updateBookDTO.getTitle());
        book.setPages(updateBookDTO.getPages());
        book.setCover_link(updateBookDTO.getCover_link());
        book.setCategory1(optionalCategory1.get());
        book.setCategory2(optionalCategory2.get());
        book.setCategory3(optionalCategory3.get());

        bookRepository.save(book);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteBookById")
    public ResponseEntity<Void> deleteBookById(@RequestParam Integer book_id) {
        Optional<Book> optionalBook = bookRepository.findById(book_id);
        if (optionalBook.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        bookRepository.deleteById(book_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
