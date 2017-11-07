package pl.stefanprogramuje.blog.domain;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Email {

    public static final String SUCCESS = "SUCCESS";
    public static final String ERROR = "ERROR";

    @NotNull
    @org.hibernate.validator.constraints.Email
    private String from;
    private String subject;

    @Size(max = 10000)
    private String content;
    private String status;

    public Email() {
    }

    public Email(String from, String subject, String content) {
        this.from = from;
        this.subject = subject;
        this.content = content;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Email{" +
                "from='" + from + '\'' +
                ", subject='" + subject + '\'' +
                ", content='" + content + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
