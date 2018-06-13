package pl.stefanprogramuje.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.stefanprogramuje.blog.domain.PasswordData;
import pl.stefanprogramuje.blog.domain.User;
import pl.stefanprogramuje.blog.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/{id}/change-password")
    public ResponseEntity<User> changePassword(@PathVariable String id, @RequestBody PasswordData passwordData) {
        User user = userService.findById(id);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        if (!passwordEncoder.matches(passwordData.getCurrentPassword(), user.getPassword()))
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        user.setPassword(passwordEncoder.encode(passwordData.getNewPassword()));
        userService.edit(user);

        return ResponseEntity.ok(user);
    }
}
