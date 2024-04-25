package com.shelfService.shelfSyncDB.list_elements.dto;

import com.shelfService.shelfSyncDB.list_elements.Progress;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddElementDTO {
    private Progress progress;

    @Min(value = 0, message = "Degree must be at least 0")
    @Max(value = 2000, message = "Current pages must be at most 2000")
    @NotNull(message = "Current pages is required")
    private Integer current_pages;

    @NotEmpty(message = "UID is required")
    private String uid;

    @NotNull(message = "Book ID is required")
    private Integer book_id;
}
