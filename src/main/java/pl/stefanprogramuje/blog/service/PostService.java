package pl.stefanprogramuje.blog.service;

import pl.stefanprogramuje.blog.domain.Post;

import java.util.List;

public interface PostService {

    List<Post> findLatest5();

    List<Post> findNext6FromPage(int page);

    List<Post> findNext6ByCategoryNameUrlFromPage(String categoryNameUrl, int page);

    Post findById(Long id);

    Post findByTitleUrl(String titleUrl);

    List<Post> findFirst5ByTopTrue();

    List<Post> findNext6ByTopTrue(int page);

    Post create(Post post);

    Post edit(Post post);

    void deleteById(Long id);
}
