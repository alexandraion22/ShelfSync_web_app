package com.shelfService.shelfSyncBE.list_elements;

import com.shelfService.shelfSyncBE.books.BookService;
import com.shelfService.shelfSyncBE.list_elements.dto.AddElementDTO;
import com.shelfService.shelfSyncBE.list_elements.dto.ReturnElementDTO;
import com.shelfService.shelfSyncBE.list_elements.dto.UpdateElementDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/list_elements")
@SecurityRequirement(name = "Bearer Authentication")
@PreAuthorize("hasRole('READER')")
public class ListElementController {
    private final ListElementService listElementService;

    public ListElementController(ListElementService listElementService){
        this.listElementService=listElementService;
    }

    @GetMapping("/getElementById")
    public ResponseEntity<ReturnElementDTO> getElementById(@RequestParam Integer id) {
        return listElementService.getElementById(id);
    }

    @PostMapping("/createElement")
    public ResponseEntity<String> createElement(@Valid @RequestBody AddElementDTO addElementDTO) {
        return listElementService.createElement(addElementDTO);
    }

    @PutMapping("/updateElementById")
    public ResponseEntity<String> updateReview(@Valid @RequestBody UpdateElementDTO updateElementDTO) {
        return listElementService.updateElementById(updateElementDTO);
    }

    @DeleteMapping("/deleteElementById")
    public ResponseEntity<Void> deleteElementById(@RequestParam Integer id) {
        return listElementService.deleteElementById(id);
    }

}
