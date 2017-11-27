package pl.stefanprogramuje.blog.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30, unique = true)
    private String username;

    @Column(length = 60)
    @Getter(onMethod = @__( @JsonIgnore ))
    @Setter(onMethod = @__( @JsonProperty ))
    private String passwordHash;

    @Column(length = 100)
    private String fullName;
}
