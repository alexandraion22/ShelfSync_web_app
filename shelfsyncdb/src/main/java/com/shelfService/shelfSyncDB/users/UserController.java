package com.shelfService.shelfSyncDB.users;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/getDescriptionByUid")
    public ResponseEntity<String> getUserByUid(@RequestParam String uid) {
        User user = userRepository.findByUid(uid);
        if (user == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(user.getDescription(), HttpStatus.OK);
    }

    @PutMapping("/updateDescriptionByUid")
    public ResponseEntity<Void> updateDescriptionByUid(@RequestParam String uid, @RequestParam String description) {
        User user = userRepository.findByUid(uid);
        if(user == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        // Update description for uid
        user.setDescription(description);
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/addDescriptionByUid")
    public ResponseEntity<Void> addDescriptionByUid(@RequestParam String uid, @RequestParam String description) {
        userRepository.save(new User(uid, description));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteDescriptionByUid")
    public ResponseEntity<Void> deleteDescriptionByUid(@RequestParam String uid) {
        User user = userRepository.findByUid(uid);
        if(user == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        userRepository.deleteByUid(uid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}