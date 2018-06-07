package pl.stefanprogramuje.blog.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthenticationController {

    @GetMapping("/api/authenticate")
    public ResponseEntity<AuthenticateObject> authenticate() {
        return ResponseEntity.ok(new AuthenticateObject());
    }

    class AuthenticateObject {
        public String value = "authenticated";
    }
}
