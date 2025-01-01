package com.habit.tracker.habitTracker.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.habit.tracker.habitTracker.model.Post;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByPostIDDesc();

    Post findByPostID(Long postID);

}
