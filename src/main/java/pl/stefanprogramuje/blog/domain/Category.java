package pl.stefanprogramuje.blog.domain;

import lombok.*;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;

@Entity
@Table(name = "categories")
@Data
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    @NotBlank
    private String name;

    @Column(length = 100)
    private String nameUrl;

    @Lob
    @Column
    @NotBlank
    private String image;
}
