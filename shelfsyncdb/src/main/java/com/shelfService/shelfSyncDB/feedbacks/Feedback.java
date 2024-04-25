package com.shelfService.shelfSyncDB.feedbacks;

import java.time.LocalDate;

import com.shelfService.shelfSyncDB.users.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "feedbacks")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "feedback_id")
    private Integer feedbackId;

    @Column(name = "new_feature")
    private String new_feature;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_submitted")
    private LocalDate date_submitted;

    @Column(name = "degree_imp")
    private Integer degree_imp;

    @Column(name = "problems_pw")
    private Boolean problems_pw;

    @Column(name = "issue")
    private String issue;

    @Column(name = "issue_type1")
    private Boolean issue_type1;

    @Column(name = "issue_type2")
    private Boolean issue_type2;

    @Column(name = "issue_type3")
    private Boolean issue_type3;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid")
    private User user;

    public Feedback() {
    }

    public Feedback(User user, String new_feature, Integer degree_imp,
                    Boolean problems_pw, String issue, Boolean issue_type1,
                    Boolean issue_type2, Boolean issue_type3) {
        this.user = user;
        this.new_feature = new_feature;
        this.date_submitted = LocalDate.now();
        this.degree_imp = degree_imp;
        this.problems_pw = problems_pw;
        this.issue = issue;
        this.issue_type1 = issue_type1;
        this.issue_type2 = issue_type2;
        this.issue_type3 = issue_type3;
    }

}
