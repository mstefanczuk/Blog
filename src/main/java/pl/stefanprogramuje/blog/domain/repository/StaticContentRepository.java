package pl.stefanprogramuje.blog.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.stefanprogramuje.blog.domain.StaticContent;

@Repository
public interface StaticContentRepository extends JpaRepository<StaticContent, Long> {

    StaticContent findByName(String name);
}
