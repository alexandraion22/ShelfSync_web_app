package com.shelfService.shelfSyncDB.categories;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.shelfService.shelfSyncDB.categories.dto.ReturnCategoryDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/getCategoryById")
    public ResponseEntity<ReturnCategoryDTO> getCategoryById(@RequestParam Integer id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            return new ResponseEntity<>(new ReturnCategoryDTO(optionalCategory.get()), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getAllCategories")
    public ResponseEntity<List<ReturnCategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryRepository.findAll().stream()
                .map(ReturnCategoryDTO::new)
                .collect(Collectors.toList()));
    }
}
