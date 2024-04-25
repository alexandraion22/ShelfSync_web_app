package com.shelfService.shelfSyncBE.books.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateBookDTO {
    @NotNull(message = "Book ID is required")
    private Integer book_id;

    @NotEmpty(message = "Book Title is required")
    private String title;

    @NotEmpty(message = "Book Description is required")
    private String description;

    @NotNull(message = "Number of pages is required")
    @Min(value = 1, message = "Number of pages must be at least 1")
    private Integer pages;

    @NotNull(message = "Book category 1 is required")
    private Integer category1_id;

    @NotNull(message = "Book category 2 is required")
    private Integer category2_id;

    @NotNull(message = "Book category 3 is required")
    private Integer category3_id;

    @NotEmpty(message = "Book Cover Link is required")
    private String cover_link;
}
