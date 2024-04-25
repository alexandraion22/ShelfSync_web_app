package com.shelfService.shelfSyncDB.users;

import com.shelfService.shelfSyncDB.books.Book;
import com.shelfService.shelfSyncDB.feedbacks.Feedback;
import com.shelfService.shelfSyncDB.list_elements.*;
import com.shelfService.shelfSyncDB.reviews.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User {

    @Id
    @Column(name = "uid")
    private String uid;

    @Column(name = "description")
    private String description;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Feedback> feedbackSet = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_books",
            joinColumns = @JoinColumn(name = "uid"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private Set<Book> readerBooks = new HashSet<>();


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Book> authorBooksSet = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Review> reviewsSet = new HashSet<>();

    public User() {
    }

    public User(String uid, String description) {
        this.uid = uid;
        this.description = description;
    }

}