package com.shelfService.shelfSyncBE.feedbacks.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddFeedbackDTO {
    @NotEmpty(message = "User ID is required")
    private String uid;

    @NotNull(message = "Degree is required")
    @Min(value = 1, message = "Degree must be at least 1")
    @Max(value = 5, message = "Degree must be at most 5")
    private Integer degree_imp;

    @NotEmpty(message = "Issue is required")
    private String issue;

    private String new_feature;

    private Boolean problems_pw;

    private Boolean issue_type1;

    private Boolean issue_type2;

    private Boolean issue_type3;
}
