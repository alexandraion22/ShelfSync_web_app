package com.shelfService.shelfSyncDB.books.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddBookDTO {
    @NotEmpty(message = "User ID is required")
    private String uid;

    @NotEmpty(message = "Title is required")
    private String title;

    @NotEmpty(message = "Description is required")
    private String description;

    @NotNull(message = "Number of pages is required")
    @Min(value = 1, message = "Number of pages must be at least 1")
    private Integer pages;

    @NotNull(message = "Category is required")
    private Integer category1_id;

    @NotNull(message = "Category is required")
    private Integer category2_id;

    @NotNull(message = "Category is required")
    private Integer category3_id;

    @NotEmpty(message = "Book cover is required")
    private String cover_link;

}
