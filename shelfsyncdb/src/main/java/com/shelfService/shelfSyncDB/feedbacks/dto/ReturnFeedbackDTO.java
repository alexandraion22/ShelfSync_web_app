package com.shelfService.shelfSyncDB.feedbacks.dto;


import com.shelfService.shelfSyncDB.feedbacks.Feedback;
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

    public ReturnFeedbackDTO(Feedback feedback){
        this.feedback_id = feedback.getFeedbackId();
        this.uid = feedback.getUser().getUid();
        this.degree_imp = feedback.getDegree_imp();
        this.issue = feedback.getIssue();
        this.new_feature = feedback.getNew_feature();
        this.problems_pw = feedback.getProblems_pw();
        this.issue_type1 = feedback.getIssue_type1();
        this.issue_type2 = feedback.getIssue_type2();
        this.issue_type3 = feedback.getIssue_type3();
        this.date_submitted = feedback.getDate_submitted();
    }
}