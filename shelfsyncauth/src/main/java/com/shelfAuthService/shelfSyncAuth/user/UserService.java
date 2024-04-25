package com.shelfAuthService.shelfSyncAuth.user;

import com.google.firebase.auth.UserRecord.UpdateRequest;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.shelfAuthService.shelfSyncAuth.resources.UserRole;
import org.springframework.http.ResponseEntity;

public interface UserService {

    String addUser(CreateRequest createRequest, UserRole userRole);
    String enableUser(String email);
    ResponseEntity<String> deleteUser(String email);
    ResponseEntity<Void> addDescriptionToUser(String email);
    ResponseEntity<Void> updateUserDetails(UpdateRequest request, String description);
    ResponseEntity<String> getDescription(String uid);
}
