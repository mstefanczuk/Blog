package pl.stefanprogramuje.blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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
    @ResponseBody
    public Email send(@RequestBody Email email) {
        email.setStatus(Email.SUCCESS);

        try {
            emailService.sendEmail(email.getFrom(), email.getContent());
        } catch (MessagingException e) {
            email.setStatus(Email.ERROR);
        }

        return email;
    }
}
