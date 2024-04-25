package com.shelfService.shelfSyncDB.feedbacks;


import com.shelfService.shelfSyncDB.feedbacks.dto.AddFeedbackDTO;
import com.shelfService.shelfSyncDB.feedbacks.dto.ReturnFeedbackDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shelfService.shelfSyncDB.users.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController {
    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;

    public FeedbackController(FeedbackRepository feedbackRepository, UserRepository userRepository) {
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/getFeedbackById")
    public ResponseEntity<ReturnFeedbackDTO> getFeedbackByUid(@RequestParam Integer feedback_id) {
        Optional<Feedback> optionalFeedback = feedbackRepository.findById(feedback_id);
        if (optionalFeedback.isPresent())
            return new ResponseEntity<>(new ReturnFeedbackDTO(optionalFeedback.get()), HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getAllFeedback")
    public ResponseEntity<List<ReturnFeedbackDTO>> getAllFeedback() {
        List<ReturnFeedbackDTO> returnFeedbackDTOS = feedbackRepository.findAll()
                .stream()
                .map(ReturnFeedbackDTO::new)
                .toList();
        return new ResponseEntity<>(returnFeedbackDTOS,HttpStatus.OK);
    }

    @PostMapping("/createFeedback")
    public ResponseEntity<String> createFeedback(@RequestBody AddFeedbackDTO request) {
        if(userRepository.findByUid(request.getUid()) == null)
            return new ResponseEntity<>("Could not find user",HttpStatus.BAD_REQUEST);
        Feedback feedback = new Feedback(
                    userRepository.findByUid(request.getUid()),
                    request.getNew_feature(),
                    request.getDegree_imp(),
                    request.getProblems_pw(),
                    request.getIssue(),
                    request.getIssue_type1(),
                    request.getIssue_type2(),
                    request.getIssue_type3());
        feedbackRepository.save(feedback);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteFeedbackById")
    public ResponseEntity<Void> deleteFeedbackById(@RequestParam Integer feedback_id) {
        Optional<Feedback> optionalFeedback = feedbackRepository.findById(feedback_id);
        if (optionalFeedback.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        feedbackRepository.deleteById(feedback_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteFeedbacksByIds")
    public ResponseEntity<String> deleteFeedbackByIds(@RequestBody List<Integer> feedbackIds) {
        for (Integer feedbackId : feedbackIds) {
            Optional<Feedback> optionalFeedback = feedbackRepository.findById(feedbackId);
            if (optionalFeedback.isEmpty())
                return new ResponseEntity<>("Entry with id " + feedbackId + " not found", HttpStatus.NOT_FOUND);
        }
        for (Integer feedbackId : feedbackIds)
            feedbackRepository.deleteById(feedbackId);
        return new ResponseEntity<>("Feedback deleted successfully", HttpStatus.OK);
    }
}
