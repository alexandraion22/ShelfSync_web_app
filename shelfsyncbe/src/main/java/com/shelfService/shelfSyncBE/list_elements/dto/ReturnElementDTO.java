package com.shelfService.shelfSyncBE.list_elements.dto;

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
}
