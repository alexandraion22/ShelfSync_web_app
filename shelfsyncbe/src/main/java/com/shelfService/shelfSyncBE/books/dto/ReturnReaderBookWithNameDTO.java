package com.shelfService.shelfSyncBE.books.dto;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReturnReaderBookWithNameDTO {
    private Integer book_id;
    private String name;
    private String title;
    private String description;
    private Integer pages;
    private Integer category1_id;
    private Integer category2_id;
    private Integer category3_id;
    private String cover_link;
    private Integer current_progress;
    private String progress;
    private Integer listElement_id;
    private Double rating;
    private Integer ratingNo;

    public ReturnReaderBookWithNameDTO(ReturnReaderBookDTO returnReaderBookDTO) {
        this.book_id = returnReaderBookDTO.getBook_id();
        this.title = returnReaderBookDTO.getTitle();
        this.description = returnReaderBookDTO.getDescription();
        this.pages = returnReaderBookDTO.getPages();
        this.category1_id = returnReaderBookDTO.getCategory1_id();
        this.category2_id = returnReaderBookDTO.getCategory2_id();
        this.category3_id = returnReaderBookDTO.getCategory3_id();
        this.cover_link = returnReaderBookDTO.getCover_link();
        this.current_progress = returnReaderBookDTO.getCurrent_progress();
        this.progress = returnReaderBookDTO.getProgress();
        this.listElement_id = returnReaderBookDTO.getListElement_id();
        this.rating = returnReaderBookDTO.getRating();
        this.ratingNo = returnReaderBookDTO.getRatingNo();

        try {
            UserRecord userRecord = FirebaseAuth.getInstance().getUser(returnReaderBookDTO.getUid());
            this.name = userRecord.getDisplayName();
        } catch (FirebaseAuthException e) {
            // Handle exception or set a default name
            this.name = "Unknown User";
        }
    }
}