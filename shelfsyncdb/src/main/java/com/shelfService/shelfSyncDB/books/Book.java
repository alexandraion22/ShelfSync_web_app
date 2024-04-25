package com.shelfService.shelfSyncDB.books;

import com.shelfService.shelfSyncDB.categories.Category;
import com.shelfService.shelfSyncDB.list_elements.ListElement;
import com.shelfService.shelfSyncDB.reviews.Review;
import com.shelfService.shelfSyncDB.users.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "book_id")
    private Integer bookId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid", referencedColumnName = "uid")
    private User user;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "pages")
    private Integer pages;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category1_id", referencedColumnName = "category_id")
    private Category category1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category2_id", referencedColumnName = "category_id")
    private Category category2;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category3_id", referencedColumnName = "category_id")
    private Category category3;

    @Column(name = "cover_link")
    private String cover_link;

    @ManyToMany(mappedBy = "readerBooks", fetch = FetchType.LAZY)
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ListElement> listElements = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "book", cascade = CascadeType.ALL)
    private Set<Review> reviewsSet = new HashSet<>();

    public Book() {
    }

    public Book(String title, String description, Integer pages, String cover_link, User user, Category category1, Category category2, Category category3) {
        this.title = title;
        this.description = description;
        this.pages = pages;
        this.cover_link = cover_link;
        this.user = user;
        this.category1 = category1;
        this.category2 = category2;
        this.category3 = category3;
    }
}
