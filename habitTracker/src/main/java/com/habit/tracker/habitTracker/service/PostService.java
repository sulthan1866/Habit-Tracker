package com.habit.tracker.habitTracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.habit.tracker.habitTracker.model.Habit;
import com.habit.tracker.habitTracker.model.Post;
import com.habit.tracker.habitTracker.repo.PostRepo;

@Service
public class PostService {

    @Autowired
    private PostRepo repo;

    @Autowired
    private DBService dbService;

    @Autowired
    private HabitService habitService;

    @Autowired
    private PostInteractionsService postInteractionsService;

    public List<Post> getPosts() {
        return repo.findAllByOrderByPostIDDesc();
    }

    public Post getPostById(Long id) {
        return repo.findByPostID(id);
    }

    public Post sendPost(Post post) {
        return repo.save(post);
    }

    public Post savePost(Post post) {
        if (post.getPostID() == null)
            return null;
        return repo.save(post);
    }

    public int addPostHabit(Post post, String userID) {
        Habit habit = habitService.addHabit(userID, post.getPostID(), post.getHeading(), post.getNumberOfDays());
        String querry = post.getQuerry().replace("defaultHabitID", Long.toString(habit.getHabitID()));
        postInteractionsService.addHabitFromPost(post.getPostID(), userID);
        return dbService.insert(querry);
    }

    public boolean deletePost(Long postID) {
        if (repo.findByPostID(postID) == null)
            return false;
        repo.deleteById(postID);
        postInteractionsService.deletePostInteractions(postID);
        return true;
    }
}
