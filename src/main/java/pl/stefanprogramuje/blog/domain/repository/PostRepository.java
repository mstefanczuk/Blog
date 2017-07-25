package pl.stefanprogramuje.blog.domain.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.stefanprogramuje.blog.domain.Post;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p ORDER BY p.date DESC")
    List<Post> findLatestFromPage(Pageable pageable);

    Post findByTitleUrl(String titleUrl);
}
