package pl.stefanprogramuje.blog.domain;

import lombok.Data;

@Data
public class PasswordData {

    private String currentPassword;
    private String newPassword;
}
