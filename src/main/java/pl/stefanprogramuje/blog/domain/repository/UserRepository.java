package pl.stefanprogramuje.blog.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.stefanprogramuje.blog.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
