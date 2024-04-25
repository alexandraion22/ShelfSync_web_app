package com.shelfAuthService.shelfSyncAuth.user;

import com.shelfAuthService.shelfSyncAuth.resources.UserRole;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserUpdateDetailsDTO {
    @NotEmpty(message = "Uid is required")
    private String uid;
    @NotEmpty(message = "First name is required")
    private String firstName;
    @NotEmpty(message = "Last name is required")
    private String lastName;
    private String photoUrl;
    private String description;
}
