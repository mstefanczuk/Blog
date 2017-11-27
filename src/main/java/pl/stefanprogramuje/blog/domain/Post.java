package pl.stefanprogramuje.blog.domain;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "posts")
@Data
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
}
