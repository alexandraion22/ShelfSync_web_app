package com.shelfService.shelfSyncBE.books;

import com.shelfService.shelfSyncBE.books.dto.AddBookDTO;
import com.shelfService.shelfSyncBE.books.dto.ReturnAuthorBookDTO;
import com.shelfService.shelfSyncBE.books.dto.ReturnReaderBookDTO;
import com.shelfService.shelfSyncBE.books.dto.UpdateBookDTO;
import com.shelfService.shelfSyncBE.resources.Constants;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class BookServiceImpl implements BookService{
    private final RestTemplate restTemplate;
    public BookServiceImpl(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @Override
    public ResponseEntity<ReturnReaderBookDTO> getBookByBookIdAndReaderId(String uid, Integer bookId) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/books/getBookByBookIdAndReaderId?book_id=" + bookId + "&uid=" + uid, HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        } catch (HttpClientErrorException ex){
            return new ResponseEntity<>(null, ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<ReturnAuthorBookDTO> getBookByBookIdAuthor(Integer bookId) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/books/getBookByBookIdAuthor?book_id="+ bookId, HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        } catch (HttpClientErrorException ex){
            return new ResponseEntity<>(null, ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<List<ReturnAuthorBookDTO>> getAllBooksByAuthorId(String uid) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/books/getAllBooksByAuthorId?uid="+ uid , HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        } catch (HttpClientErrorException ex){
            return new ResponseEntity<>(null, ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<List<ReturnReaderBookDTO>> getAllBooksByReaderId(String uid) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/books/getAllBooksByReaderId?uid="+ uid , HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        } catch (HttpClientErrorException ex){
            return new ResponseEntity<>(null, ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<String> createBook(AddBookDTO addBookDTO) {
        try {
            return restTemplate.postForEntity(Constants.baseDbUrl + "/books/createBook", addBookDTO, String.class);
        } catch (HttpClientErrorException ex) {
            return new ResponseEntity<>(ex.getMessage(),ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<String> updateBookById(UpdateBookDTO updateBookDTO) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/books/updateBookById", HttpMethod.PUT, new HttpEntity<>(updateBookDTO,new HttpHeaders()), String.class);
        } catch (HttpClientErrorException ex){
            return new ResponseEntity<>(ex.getMessage(),ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<Void> deleteBookById(Integer bookId) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/books/deleteBookById?book_id="+bookId, HttpMethod.DELETE, new HttpEntity<>(new HttpHeaders()), Void.class);
        } catch (HttpClientErrorException ex){
            return new ResponseEntity<>(null,ex.getStatusCode());
        }
    }
}
