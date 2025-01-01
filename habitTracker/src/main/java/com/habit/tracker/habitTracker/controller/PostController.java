package com.habit.tracker.habitTracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.habit.tracker.habitTracker.model.Post;
import com.habit.tracker.habitTracker.service.PostService;

@RestController
@CrossOrigin(origins = "${FRONT_END}")
@RequestMapping("/api/v1")
public class PostController {

    @Autowired
    private PostService postService;

    @Value("${POST_PASSWORD}")
    private String password;

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getPosts() {
        List<Post> posts = postService.getPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/posts/{postID}")
    public ResponseEntity<Post> getPostByID(@PathVariable Long postID) {
        Post post = postService.getPostById(postID);
        if (post == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @PostMapping("/posts")
    public ResponseEntity<Post> sendPost(@RequestBody List<Post> post) {
        if (!(post.get(0).getHeading().equals(password))) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (post.get(1).getPostID() != null || postService.getPostById(post.get(1).getPostID()) != null)
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        Post createdPost = postService.sendPost(post.get(1));
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @PutMapping("/posts/{postID}")
    public ResponseEntity<Post> savePost(@PathVariable Long postID, @RequestBody List<Post> post) {
        if (!(post.get(0).getHeading().equals(password))) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (post.get(1).getPostID() == null || postService.getPostById(postID) == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        Post savedPost = postService.savePost(post.get(1));
        return new ResponseEntity<>(savedPost, HttpStatus.ACCEPTED);
    }

    @PostMapping("/posts/{userID}/habits")
    public ResponseEntity<Integer> addNewPostHabit(@RequestBody Post post, @PathVariable String userID) {
        int numDays = postService.addPostHabit(post, userID);
        return new ResponseEntity<>(numDays, HttpStatus.CREATED);
    }

    @DeleteMapping("/posts/{postID}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable Long postID) {
        boolean isDeleted = postService.deletePost(postID);
        if (!isDeleted)
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
