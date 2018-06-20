package pl.stefanprogramuje.blog.domain.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.stefanprogramuje.blog.domain.Post;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByOrderByDateDesc(Pageable pageable);

    Post findByTitleUrl(String titleUrl);

    List<Post> findAllByCategory_NameUrlOrderByDateDesc(String categoryNameUrl, Pageable pageable);

    List<Post> findAllByTopTrue(Pageable pageable);
}
