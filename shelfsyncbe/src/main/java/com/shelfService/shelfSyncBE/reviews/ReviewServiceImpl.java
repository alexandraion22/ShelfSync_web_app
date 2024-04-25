package com.shelfService.shelfSyncBE.reviews;


import com.shelfService.shelfSyncBE.resources.Constants;
import com.shelfService.shelfSyncBE.reviews.dto.AddReviewDTO;
import com.shelfService.shelfSyncBE.reviews.dto.ReturnReviewDTO;
import com.shelfService.shelfSyncBE.reviews.dto.UpdateReviewDTO;
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
public class ReviewServiceImpl implements ReviewService {
    private final RestTemplate restTemplate;
    public ReviewServiceImpl(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @Override
    public ResponseEntity<ReturnReviewDTO> getReviewByReviewId(Integer reviewId) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/reviews/getReviewById?review_id="+reviewId, HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        } catch (HttpClientErrorException ex){
            return new ResponseEntity<>(null, ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<ReturnReviewDTO> getReviewByUidAndBookId(String uid, Integer bookId) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/reviews/getReviewByUidAndBookId?uid="+uid+"&bookId="+ bookId, HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        } catch (HttpClientErrorException ex){
            return new ResponseEntity<>(null, ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<List<ReturnReviewDTO>> getAllReviewsByBookId(Integer bookId) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/reviews/getReviewsByBookId?bookId="+ bookId , HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        } catch (HttpClientErrorException ex){
            return new ResponseEntity<>(null, ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<String> createReview(AddReviewDTO addReviewDTO) {
        try {
            return restTemplate.postForEntity(Constants.baseDbUrl + "/reviews/createReview", addReviewDTO, String.class);
        } catch (HttpClientErrorException ex) {
            return new ResponseEntity<>(ex.getMessage(),ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<String> updateReview(UpdateReviewDTO updateReviewDTO) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/reviews/updateReviewById", HttpMethod.PUT, new HttpEntity<>(updateReviewDTO,new HttpHeaders()), String.class);
        } catch (HttpClientErrorException ex){
            return new ResponseEntity<>(ex.getMessage(),ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<Void> deleteReviewById(Integer reviewId) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/reviews/deleteReviewById?review_id="+reviewId, HttpMethod.DELETE, new HttpEntity<>(new HttpHeaders()), Void.class);
        } catch (HttpClientErrorException ex){
            return new ResponseEntity<>(null,ex.getStatusCode());
        }
    }
}
