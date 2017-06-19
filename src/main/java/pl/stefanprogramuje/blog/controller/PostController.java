package pl.stefanprogramuje.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.stefanprogramuje.blog.domain.Post;
import pl.stefanprogramuje.blog.service.PostService;

import java.util.List;

@RestController()
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/id/{id}")
    public Post getPost(@PathVariable Long id) {
        return postService.findById(id);
    }

    @GetMapping("/latest5")
    public List<Post> getLatest5Posts() {
        return postService.findLatest5();
    }

    @GetMapping("/title/{titleUrl}")
    public Post getPostByTitleUrl(@PathVariable String titleUrl) {
        return postService.findByTitleUrl(titleUrl);
    }
}
