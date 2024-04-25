package com.shelfAuthService.shelfSyncAuth.user;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.google.firebase.auth.UserRecord.UpdateRequest;
import com.shelfAuthService.shelfSyncAuth.resources.Constants;
import com.shelfAuthService.shelfSyncAuth.resources.UserRole;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }
    
    @PostMapping("/createUser")
    public ResponseEntity<String> createUser(@Valid @RequestBody UserAddDTO userAddDTO){
        CreateRequest request;
        try {
            request = new CreateRequest()
                    .setEmail(userAddDTO.getEmail())
                    .setPassword(userAddDTO.getPassword())
                    .setPhotoUrl(userAddDTO.getPhotoUrl() != null ? userAddDTO.getPhotoUrl() : Constants.baseProfilePicUrl)
                    .setDisplayName(userAddDTO.getFirstName() + " " + userAddDTO.getLastName())
                    .setDisabled(userAddDTO.getUserRole().equals(UserRole.AUTHOR));
        } catch (IllegalArgumentException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }

        String errorMessage = userService.addUser(request, userAddDTO.getUserRole());

        if(errorMessage!=null)
            return new ResponseEntity<>(errorMessage,HttpStatus.BAD_REQUEST);

        // Create new entry in database - (UID,DESCRIPTION)
        ResponseEntity<Void> response = userService.addDescriptionToUser(userAddDTO.getEmail());
        if(response.getStatusCode()==HttpStatus.CREATED)
            return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);

        // Delete user from Firebase if Postgres is not working
        userService.deleteUser(userAddDTO.getEmail());
        return new ResponseEntity<>("Could not create user", response.getStatusCode());
    }

    @PostMapping("/enableAuthorUser")
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> enableAuthorUser(@RequestParam String email) {
        String errorMessage = userService.enableUser(email);
        if(errorMessage!=null)
            return new ResponseEntity<>(errorMessage,HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>("User enabled successfully",HttpStatus.OK);
    }

    @DeleteMapping("/deleteUser")
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@RequestParam String email) {
        return userService.deleteUser(email);
    }

    @PutMapping("/updateUserDetails")
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('READER') OR hasRole('AUTHOR')")
    public ResponseEntity<Void> updateUser(@Valid @RequestBody UserUpdateDetailsDTO userUpdateDetailsDTO) {
        try {
            UpdateRequest request = new UpdateRequest(userUpdateDetailsDTO.getUid())
                    .setDisplayName(userUpdateDetailsDTO.getFirstName() + " " + userUpdateDetailsDTO.getLastName())
                    .setPhotoUrl(userUpdateDetailsDTO.getPhotoUrl());
            return userService.updateUserDetails(request, userUpdateDetailsDTO.getDescription());
        } catch (Exception e)
        {
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getUserDetails")
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasAnyRole('READER','AUTHOR')")
    public ResponseEntity<String> getDescriptionByUid(@RequestParam String uid){
        return userService.getDescription(uid);
    }
}