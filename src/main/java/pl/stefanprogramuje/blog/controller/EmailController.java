package pl.stefanprogramuje.blog.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.stefanprogramuje.blog.domain.Email;
import pl.stefanprogramuje.blog.service.EmailService;

import javax.mail.MessagingException;

@Controller
@RequestMapping("/api/email")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> send(@RequestBody Email email) {
        email.setStatus(Email.SUCCESS);

        try {
            emailService.sendEmail(email.getFrom(), email.getSubject(), email.getContent());
        } catch (MessagingException e) {
            email.setStatus(Email.ERROR);
        }

        return new ResponseEntity<>(email.getStatus(), HttpStatus.OK);
    }
}
