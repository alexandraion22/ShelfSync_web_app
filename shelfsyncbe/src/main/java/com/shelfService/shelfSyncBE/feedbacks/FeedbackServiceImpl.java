package com.shelfService.shelfSyncBE.feedbacks;

import com.shelfService.shelfSyncBE.feedbacks.dto.AddFeedbackDTO;
import com.shelfService.shelfSyncBE.feedbacks.dto.ReturnFeedbackDTO;
import com.shelfService.shelfSyncBE.resources.Constants;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService{
    private final RestTemplate restTemplate;

    public FeedbackServiceImpl(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @Override
    public ResponseEntity<String> addFeedback(AddFeedbackDTO addFeedbackDTO) {
        try {
            return restTemplate.postForEntity(Constants.baseDbUrl + "/feedbacks/createFeedback", addFeedbackDTO, String.class);
        } catch (HttpClientErrorException ex) {
            return new ResponseEntity<>(ex.getMessage(),ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<List<ReturnFeedbackDTO>> getAllFeedback() {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/feedbacks/getAllFeedback", HttpMethod.GET, null, new ParameterizedTypeReference<>() {});
        } catch (HttpClientErrorException ex) {
            return new ResponseEntity<>(null,ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<String> deleteFeedbackByIds(List<Integer> feedbackIds) {
        try {
            return restTemplate.exchange(Constants.baseDbUrl + "/feedbacks/deleteFeedbacksByIds", HttpMethod.DELETE, new HttpEntity<>(feedbackIds, new HttpHeaders()), String.class);
        } catch  (HttpClientErrorException ex) {
            return new ResponseEntity<>(ex.getMessage(),ex.getStatusCode());
        }
    }
}
