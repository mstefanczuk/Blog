package pl.stefanprogramuje.blog.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pl.stefanprogramuje.blog.domain.Post;
import pl.stefanprogramuje.blog.domain.repository.PostRepository;
import pl.stefanprogramuje.blog.service.PostService;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    @Override
    public List<Post> findLatest5() {
        return postRepository.findLatestFromPage(new PageRequest(0, 5));
    }

    @Override
    public List<Post> findNext6FromPage(int page) {
        return postRepository.findLatestFromPage(new PageRequest(page, 6));
    }

    @Override
    public Post findById(Long id) {
        return postRepository.findOne(id);
    }

    @Override
    public Post findByTitleUrl(String titleUrl) {
        return postRepository.findByTitleUrl(titleUrl);
    }

    @Override
    public Post create(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post edit(Post post) {
        return postRepository.save(post);
    }

    @Override
    public void deleteById(Long id) {
        postRepository.delete(id);
    }
}
