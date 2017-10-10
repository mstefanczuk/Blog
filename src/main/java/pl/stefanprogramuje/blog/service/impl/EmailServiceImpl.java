package pl.stefanprogramuje.blog.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import pl.stefanprogramuje.blog.service.EmailService;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    private static final String TO_EMAIL_ADDRESS = "kontotestowedotestowania666@gmail.com";
    private static final String SUBJECT = "Wiadomość z formularza";

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void sendEmail(String from, String content) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setTo(TO_EMAIL_ADDRESS);
        helper.setReplyTo(from);
        helper.setFrom(from);
        helper.setSubject(SUBJECT);
        helper.setText(content, true);

        javaMailSender.send(mimeMessage);
    }
}
