package com.shelfService.shelfSyncDB.list_elements.dto;

import com.shelfService.shelfSyncDB.list_elements.ListElement;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReturnElementDTO {
    private Integer elementId;
    private String progress;
    private Integer current_pages;
    private Integer book_id;
    private String uid;

    public ReturnElementDTO(ListElement listElement){
        this.elementId = listElement.getElementId();
        this.progress = listElement.getProgress();
        this.current_pages = listElement.getCurrent_pages();
        this.book_id = listElement.getBook().getBookId();
        this.uid = listElement.getUser().getUid();
    }


}
