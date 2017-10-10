package pl.stefanprogramuje.blog.service;

import javax.mail.MessagingException;

public interface EmailService {

    void sendEmail(String from, String content) throws MessagingException;
}
