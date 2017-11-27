package pl.stefanprogramuje.blog.domain;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 300)
    @NotBlank
    private String title;

    @Lob
    @Column(nullable = false)
    private String body;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private User author;

    @Column(nullable = false)
    private Date date;

    @Column(length = 300, unique = true)
    @NotBlank
    private String titleUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;

    public Post() {
    }

    public Post(String title, String body, User author, Date date, String titleUrl, Category category) {
        this.title = title;
        this.body = body;
        this.author = author;
        this.date = date;
        this.titleUrl = titleUrl;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTitleUrl() {
        return titleUrl;
    }

    public void setTitleUrl(String titleUrl) {
        this.titleUrl = titleUrl;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", body='" + body + '\'' +
                ", author=" + author +
                ", date=" + date +
                ", titleUrl='" + titleUrl + '\'' +
                ", category=" + category +
                '}';
    }
}
