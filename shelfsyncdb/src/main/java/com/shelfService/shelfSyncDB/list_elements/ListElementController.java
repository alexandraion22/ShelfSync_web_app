package com.shelfService.shelfSyncDB.list_elements;

import com.shelfService.shelfSyncDB.books.Book;
import com.shelfService.shelfSyncDB.books.BookRepository;
import com.shelfService.shelfSyncDB.list_elements.dto.AddElementDTO;
import com.shelfService.shelfSyncDB.list_elements.dto.ReturnElementDTO;
import com.shelfService.shelfSyncDB.list_elements.dto.UpdateElementDTO;
import com.shelfService.shelfSyncDB.users.User;
import com.shelfService.shelfSyncDB.users.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/list_elements")
public class ListElementController {
    private final ListElementRepository listElementRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public ListElementController(ListElementRepository listElementRepository, BookRepository bookRepository, UserRepository userRepository) {
        this.listElementRepository = listElementRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/getElementById")
    public ResponseEntity<ReturnElementDTO> getElementById(@RequestParam Integer id) {
        Optional<ListElement> element = listElementRepository.findById(id);
        if (element.isEmpty())
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(new ReturnElementDTO(element.get()), HttpStatus.OK);
    }

    @PostMapping("/createElement")
    public ResponseEntity<String> createElement(@RequestBody AddElementDTO addElementDTO) {
        Optional<Book> optionalBook = bookRepository.findById(addElementDTO.getBook_id());
        User user = userRepository.findByUid(addElementDTO.getUid());

        if(user==null)
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        if(optionalBook.isEmpty())
            return new ResponseEntity<>("Book not found", HttpStatus.NOT_FOUND);

        if(listElementRepository.findByUserAndBook(user,optionalBook.get())!=null)
            return new ResponseEntity<>("Entry already exists for uid and bookid", HttpStatus.BAD_REQUEST);

        // Validate progress value (optional)
        if (!isValidProgress(addElementDTO.getProgress().toString())) {
            return new ResponseEntity<>("Invalid progress value", HttpStatus.BAD_REQUEST);
        }

        ListElement element = new ListElement(user, optionalBook.get(), addElementDTO.getProgress().toString(), addElementDTO.getCurrent_pages());

        listElementRepository.save(element);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/updateElementById")
    public ResponseEntity<String> updateReview(@RequestBody UpdateElementDTO updateElementDTO) {
        Optional<ListElement> element = listElementRepository.findById(updateElementDTO.getElement_id());

        if (element.isEmpty())
            return new ResponseEntity<>("Element not found", HttpStatus.NOT_FOUND);

        // Validate progress value (optional)
        if (!isValidProgress(updateElementDTO.getProgress().toString()))
            return new ResponseEntity<>("Invalid progress value", HttpStatus.BAD_REQUEST);

        element.get().setProgress(updateElementDTO.getProgress().toString());
        element.get().setCurrent_pages(updateElementDTO.getCurrent_pages());
        listElementRepository.save(element.get());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteElementById")
    public ResponseEntity<Void> deleteElementById(@RequestParam Integer id) {
        Optional<ListElement> element = listElementRepository.findById(id);
        if(element.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        listElementRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Utility method to validate progress value (optional)
    private boolean isValidProgress(String progress) {
        // Assuming progress can only be one of these values
        return progress.equals("dnf") || progress.equals("wtr") || progress.equals("read") || progress.equals("cr") || progress.equals("nr");
    }

}
