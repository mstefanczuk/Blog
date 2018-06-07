package pl.stefanprogramuje.blog.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import pl.stefanprogramuje.blog.domain.Post;
import pl.stefanprogramuje.blog.domain.repository.PostRepository;
import pl.stefanprogramuje.blog.domain.repository.UserRepository;
import pl.stefanprogramuje.blog.service.PostService;

import java.text.Normalizer;
import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class PostServiceImpl implements PostService {

    private static final String DEFAULT_AUTHOR_ID = "stefan";

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Post> findLatest5() {
        return postRepository.findAllByOrderByDateDesc(new PageRequest(0, 5));
    }

    @Override
    public List<Post> findNext6FromPage(int page) {
        return postRepository.findAllByOrderByDateDesc(new PageRequest(page, 6));
    }

    @Override
    public List<Post> findNext6ByCategoryNameUrlFromPage(String categoryNameUrl, int page) {
        return postRepository.findAllByCategory_NameUrlOrderByDateDesc(categoryNameUrl, new PageRequest(page, 6));
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
        post.setTitleUrl(getUrlName(post.getTitle()));
        post.setAuthor(userRepository.findOne(DEFAULT_AUTHOR_ID));
        post.setDate(new Date());
        return postRepository.save(post);
    }

    @Override
    public Post edit(Post post) {
        post.setTitleUrl(getUrlName(post.getTitle()));
        return postRepository.save(post);
    }

    @Override
    public void deleteById(Long id) {
        postRepository.delete(id);
    }

    private String getUrlName(String name) {
        String normalizedName = Normalizer.normalize((name), Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalizedName).replaceAll("")
                .replaceAll("\\s+", "-")
                .toLowerCase();
    }
}
