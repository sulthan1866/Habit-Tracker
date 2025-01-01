package com.habit.tracker.habitTracker.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.habit.tracker.habitTracker.model.PostInteraction;
import com.habit.tracker.habitTracker.service.PostInteractionsService;

@RestController
@CrossOrigin(origins = "${FRONT_END}")
@RequestMapping("/api/v1")
public class PostInteractionController {

    @Autowired
    private PostInteractionsService postInteractionsService;

    @GetMapping("/posts/{postID}/{userID}/likes")
    public ResponseEntity<Map<String, Long>> getLikeInfo(@PathVariable Long postID, @PathVariable String userID) {
        Long numberOfLikes = postInteractionsService.getNumberOfLikes(postID);
        boolean isLiked = postInteractionsService.isLiked(postID, userID);
        boolean isHabitAdded = postInteractionsService.isHabitAdded(postID, userID);
        Map<String, Long> additionalInfoMap = new HashMap<>();
        additionalInfoMap.put("numberOfLikes", numberOfLikes);
        additionalInfoMap.put("isLiked", (isLiked) ? 1L : null);
        additionalInfoMap.put("isHabitAdded", (isHabitAdded) ? 1L : null);
        return new ResponseEntity<>(additionalInfoMap, HttpStatus.OK);
    }

    @PostMapping("/posts/{postID}/{userID}/likes")
    public ResponseEntity<PostInteraction> likePost(@PathVariable Long postID, @PathVariable String userID) {
        PostInteraction like = postInteractionsService.likePost(postID, userID);
        if (like == null)
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        return new ResponseEntity<>(like, HttpStatus.OK);
    }

    @DeleteMapping("/posts/{postID}/{userID}/likes")
    public ResponseEntity<HttpStatus> unLikePost(@PathVariable Long postID, @PathVariable String userID) {
        postInteractionsService.removeLike(postID, userID);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
