package pl.stefanprogramuje.blog.service;

import javax.mail.MessagingException;

public interface EmailService {

    void sendEmail(String from, String subject, String content) throws MessagingException;
}
