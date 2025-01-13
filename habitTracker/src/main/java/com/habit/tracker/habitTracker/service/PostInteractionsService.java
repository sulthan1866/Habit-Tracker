package com.habit.tracker.habitTracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.habit.tracker.habitTracker.model.PostInteraction;
import com.habit.tracker.habitTracker.repo.PostInteractionRepo;

@Service
public class PostInteractionsService {

    @Autowired
    private PostInteractionRepo repo;

    public PostInteraction likePost(Long postID, String userID) {
        if (isLiked(postID, userID))
            return null;
        PostInteraction like = new PostInteraction(null, postID, userID, "liked");
        return repo.save(like);
    }

    public boolean isLiked(Long postID, String userID) {
        PostInteraction like = repo.findByPostIDAndUserIDAndInteraction(postID, userID, "liked");
        return like != null;
    }

    @Transactional
    public void removeLike(Long postID, String userID) {
        repo.deleteByPostIDAndUserIDAndInteraction(postID, userID, "liked");
    }

    public Long getNumberOfLikes(Long postID) {
        return repo.getNumberOfLikes(postID);
    }

    public PostInteraction addHabitFromPost(Long postID, String userID) {
        PostInteraction habitFromPost = new PostInteraction(null, postID, userID, "added");
        return repo.save(habitFromPost);
    }

    public boolean isHabitAdded(Long postID, String userID) {
        PostInteraction habitFromPost = repo.findByPostIDAndUserIDAndInteraction(postID, userID, "added");
        return habitFromPost != null;
    }

    @Transactional
    public void removeHabitFromPost(Long postID, String userID) {
        repo.deleteByPostIDAndUserIDAndInteraction(postID, userID, "added");
    }

    @Transactional
    public void deletePostInteractions(Long postID) {

        repo.deleteByPostID(postID);
    }

}
