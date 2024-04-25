package com.shelfService.shelfSyncBE.feedbacks.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReturnFeedbackDTO {
    private Integer feedback_id;
    private String uid;
    private Integer degree_imp;
    private String issue;
    private String new_feature;
    private Boolean problems_pw;
    private Boolean issue_type1;
    private Boolean issue_type2;
    private Boolean issue_type3;
    private LocalDate date_submitted;
}