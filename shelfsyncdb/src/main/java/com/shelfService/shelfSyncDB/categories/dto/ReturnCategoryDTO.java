package com.shelfService.shelfSyncDB.categories.dto;

import com.shelfService.shelfSyncDB.categories.Category;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReturnCategoryDTO {
    private Integer categoryId;
    private String name;

    public ReturnCategoryDTO(Category category){
        this.categoryId = category.getCategoryId();
        this.name = category.getName();
    }
}
