package com.shelfService.shelfSyncBE.feedbacks;

import com.shelfService.shelfSyncBE.feedbacks.dto.AddFeedbackDTO;
import com.shelfService.shelfSyncBE.feedbacks.dto.ReturnFeedbackDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/feedbacks")
@SecurityRequirement(name = "Bearer Authentication")
public class FeedbackController {
    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService){
        this.feedbackService= feedbackService;
    }
    @PreAuthorize("hasRole('AUTHOR') OR hasRole('READER')")
    @PostMapping("/addFeedback")
    public ResponseEntity<String> addFeedback(@Valid @RequestBody AddFeedbackDTO addFeedbackDTO){
        return feedbackService.addFeedback(addFeedbackDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getAllFeedback")
    public ResponseEntity<List<ReturnFeedbackDTO>> getAllFeedback(){
        return feedbackService.getAllFeedback();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteFeedbacksByIds")
    public ResponseEntity<String> deleteFeedbackByIds(@RequestBody List<Integer> feedbackIds) {
        return feedbackService.deleteFeedbackByIds(feedbackIds);
    }
}
