package pl.stefanprogramuje.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.stefanprogramuje.blog.domain.Post;
import pl.stefanprogramuje.blog.service.PostService;

import java.util.List;

@RestController()
@RequestMapping("/posts")
public class PostsController {

    private final PostService postService;

    @Autowired
    public PostsController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable Long id) {
        return postService.findById(id);
    }

    @GetMapping("/latest5")
    public List<Post> getLatest5Posts() {
        return postService.findLatest5();
    }

}
