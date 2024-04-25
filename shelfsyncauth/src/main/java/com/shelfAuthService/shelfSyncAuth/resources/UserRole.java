package com.shelfAuthService.shelfSyncAuth.resources;

public enum UserRole {
    AUTHOR("AUTHOR"),
    READER("READER");

    private final String value;
    UserRole(String value) {
        this.value = value;
    }
    public String getValue() {
        return value;
    }

}
