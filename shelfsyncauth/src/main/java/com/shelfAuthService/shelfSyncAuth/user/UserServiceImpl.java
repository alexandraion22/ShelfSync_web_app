package com.shelfAuthService.shelfSyncAuth.user;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord.*;
import com.google.firebase.auth.UserRecord;
import com.shelfAuthService.shelfSyncAuth.resources.Constants;
import com.shelfAuthService.shelfSyncAuth.resources.UserRole;
import org.apache.coyote.Response;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    private final RestTemplate restTemplate;

    public UserServiceImpl(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @Override
    public String addUser(CreateRequest createRequest, UserRole userRole) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("role",userRole.getValue());

        // Try adding account in firebase - return possible error message (E.G EMAIL ALREADY USED FOR ANOTHER ACCOUNT)
        try {
            UserRecord userRecord = FirebaseAuth.getInstance().createUser(createRequest);
            FirebaseAuth.getInstance().setCustomUserClaims(userRecord.getUid(), claims);
        } catch (FirebaseAuthException e) {
            return e.getMessage();
        }

        // Success
        return null;
    }

    @Override
    public String enableUser(String email) {
        // TRY ENABLING AUTHOR ACCOUNT - FAILS IF THERE IS NO ACCOUNT WITH THE EMAIL PROVIDED
        try {
            UserRecord userRecord = FirebaseAuth.getInstance().getUserByEmail(email);
            UserRecord.UpdateRequest request = new UserRecord.UpdateRequest(userRecord.getUid())
                    .setDisabled(false);
            FirebaseAuth.getInstance().updateUser(request);
        } catch (FirebaseAuthException e) {
            return e.getMessage();
        }

        // Success
        return null;
    }

    @Override
    public ResponseEntity<String> deleteUser(String email) {

        // Try deleting account - Fails if there is no account with the email provided
        try {
            UserRecord userRecord = FirebaseAuth.getInstance().getUserByEmail(email);
            FirebaseAuth.getInstance().deleteUser(userRecord.getUid());

            // Delete the user from the postgres DB as well
            restTemplate.delete(Constants.baseDbUrl+"/users/deleteDescriptionByUid?uid=" + userRecord.getUid());
        } catch (HttpClientErrorException ex) {
            return new ResponseEntity<>(ex.getMessage(),ex.getStatusCode());
        } catch (FirebaseAuthException e) {
            return new ResponseEntity<>("Could not delete account", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // Success
        return null;
    }

    @Override
    public ResponseEntity<Void> addDescriptionToUser(String email) {
        try {
            // Add a default description to every user on creation
            UserRecord userRecord = FirebaseAuth.getInstance().getUserByEmail(email);
            return restTemplate.postForEntity(Constants.baseDbUrl+"/users/addDescriptionByUid?uid={uid}&description={description}", null, Void.class,userRecord.getUid(), Constants.baseDescription);
        } catch (HttpClientErrorException ex) {
            return new ResponseEntity<>(null,ex.getStatusCode());
        } catch (FirebaseAuthException ex) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Void> updateUserDetails(UpdateRequest request, String description) {
        try {
            UserRecord userRecord = FirebaseAuth.getInstance().updateUser(request);
            return  restTemplate.exchange(
                    Constants.baseDbUrl+"/users/updateDescriptionByUid?uid={uid}&description={description}",
                    HttpMethod.PUT,
                    new HttpEntity<>(new HttpHeaders()),
                    Void.class,
                    userRecord.getUid(),
                    description);
        } catch (FirebaseAuthException e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (HttpClientErrorException ex) {
            return new ResponseEntity<>(null,ex.getStatusCode());
        }
    }

    @Override
    public ResponseEntity<String> getDescription(String uid) {
        try {
            return restTemplate.getForEntity(Constants.baseDbUrl+"/users/getDescriptionByUid?uid={uid}",  String.class, uid);
        } catch (HttpClientErrorException ex) {
            return new ResponseEntity<>(ex.getMessage(),ex.getStatusCode());
        }
    }
}
