package pl.stefanprogramuje.blog.service;

import pl.stefanprogramuje.blog.domain.Post;

import java.util.List;

public interface PostService {

    List<Post> findAll();

    List<Post> findLatest5();

    List<Post> findNext6FromPage(int page);

    List<Post> findNext6ByCategoryNameUrlFromPage(String categoryNameUrl, int page);

    Post findById(Long id);

    Post findByTitleUrl(String titleUrl);

    Post create(Post post);

    Post edit(Post post);

    void deleteById(Long id);
}
