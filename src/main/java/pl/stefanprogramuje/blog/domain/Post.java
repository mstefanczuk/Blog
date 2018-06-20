package pl.stefanprogramuje.blog.domain;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "posts")
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 300)
    @NotBlank(groups = EditModeValidation.class)
    private String title;

    @Lob
    @Column(nullable = false)
    private String body;

    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull(groups = EditModeValidation.class)
    private User author;

    @Column
    @NotNull(groups = EditModeValidation.class)
    private Date date;

    @Column(length = 300, unique = true)
    @NotBlank(groups = EditModeValidation.class)
    private String titleUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;

    @Lob
    @Column
    @NotBlank
    private String image;

    @Column(nullable = false)
    private boolean top;

    public interface EditModeValidation {}
}
