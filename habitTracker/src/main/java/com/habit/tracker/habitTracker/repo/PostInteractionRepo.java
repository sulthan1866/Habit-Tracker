package com.habit.tracker.habitTracker.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.habit.tracker.habitTracker.model.PostInteraction;

@Repository
public interface PostInteractionRepo extends JpaRepository<PostInteraction, Long> {
    void deleteByPostID(Long postID);

    PostInteraction findByPostIDAndUserIDAndInteraction(Long postID, String userID, String interaction);

    void deleteByPostIDAndUserIDAndInteraction(Long postID, String userID, String interaction);

    @Query("SELECT COUNT(e) FROM PostInteraction e  WHERE e.postID = :postID AND e.interaction = 'liked'")
    Long getNumberOfLikes(@Param("postID") Long postID);
}
