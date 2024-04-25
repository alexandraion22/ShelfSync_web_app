package com.shelfService.shelfSyncBE.feedbacks;

import com.shelfService.shelfSyncBE.feedbacks.dto.AddFeedbackDTO;
import com.shelfService.shelfSyncBE.feedbacks.dto.ReturnFeedbackDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FeedbackService {
    ResponseEntity<String> addFeedback(AddFeedbackDTO addFeedbackDTO);
    ResponseEntity<List<ReturnFeedbackDTO>> getAllFeedback();
    ResponseEntity<String> deleteFeedbackByIds(List<Integer> feedbackIds);
}
