package pl.stefanprogramuje.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.stefanprogramuje.blog.domain.Post;
import pl.stefanprogramuje.blog.service.PostService;

import javax.validation.Valid;
import java.util.List;

@RestController()
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/latest5")
    public ResponseEntity<List<Post>> getLatest5Posts() {
        return ResponseEntity.ok(postService.findLatest5());
    }

    @GetMapping("/page/{page}")
    public ResponseEntity<List<Post>> getNext6PostsFromPage(@PathVariable int page) {
        return ResponseEntity.ok(postService.findNext6FromPage(page));
    }

    @GetMapping("/title/{titleUrl}")
    public ResponseEntity<Post> getPostByTitleUrl(@PathVariable String titleUrl) {
        Post post = postService.findByTitleUrl(titleUrl);

        if (post == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(post);
    }

    @GetMapping("/category/{categoryNameUrl}/page/{page}")
    public ResponseEntity<List<Post>> getNext6PostsByCategoryNameUrlFromPage(@PathVariable String categoryNameUrl,
                                                             @PathVariable int page) {
        return ResponseEntity.ok(postService.findNext6ByCategoryNameUrlFromPage(categoryNameUrl, page));
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@Valid @RequestBody Post post) {
        if (postService.findByTitleUrl(post.getTitleUrl()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        Post createdPost = postService.create(post);
        return ResponseEntity.ok(createdPost);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @Validated(Post.EditModeValidation.class) @RequestBody Post postDetails) {
        Post currentPost = postService.findById(id);
        if(currentPost == null) {
            return ResponseEntity.noContent().build();
        }

        currentPost.setTitle(postDetails.getTitle());
        currentPost.setBody(postDetails.getBody());
        currentPost.setAuthor(postDetails.getAuthor());
        currentPost.setDate(postDetails.getDate());
        currentPost.setTitleUrl(postDetails.getTitleUrl());
        currentPost.setCategory(postDetails.getCategory());
        currentPost.setImage(postDetails.getImage());

        Post updatedPost = postService.edit(currentPost);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Post> deletePost(@PathVariable Long id) {
        Post post = postService.findById(id);
        if(post == null) {
            return ResponseEntity.noContent().build();
        }

        postService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
