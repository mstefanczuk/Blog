package pl.stefanprogramuje.blog.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "authorities")
@Data
public class Authority {

    @Id
    private String authority;

    @ManyToOne
    @JoinColumn(name = "username")
    private User user;
}
