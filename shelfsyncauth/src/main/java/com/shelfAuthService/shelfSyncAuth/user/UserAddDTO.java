package com.shelfAuthService.shelfSyncAuth.user;

import com.shelfAuthService.shelfSyncAuth.resources.UserRole;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserAddDTO {
    private String email;
    private String password;
    @NotEmpty(message = "First name is required")
    private String firstName;
    @NotEmpty(message = "Last name is required")
    private String lastName;
    private UserRole userRole;
    private String photoUrl;
}
