package com.shelfService.shelfSyncDB.categories;

import java.util.HashSet;
import java.util.Set;

import com.shelfService.shelfSyncDB.books.Book;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "categories")
public class Category {
    @Id
    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "category1", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Book> booksSet1 = new HashSet<>();

    @OneToMany(mappedBy = "category2", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Book> booksSet2 = new HashSet<>();

    @OneToMany(mappedBy = "category3", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Book> booksSet3 = new HashSet<>();

    public Category() {
    }

}
