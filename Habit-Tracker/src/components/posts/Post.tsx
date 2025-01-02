import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Post {
  postID: number;
  heading: string;
  imageLink: string;
  content: string;
  querry: string;
}

const Post = () => {
  const [post, setPost] = useState<Post>({
    postID: -1,
    heading: "",
    imageLink: "",
    content: "",
    querry: "",
  });
  const { postID } = useParams<{ postID: string }>();
  const { userID } = useParams<{ userID: string }>();
  const navigate = useNavigate();
  const [addHabitBtn, setAddHabitBtn] = useState<string>("Add Habit");
  const [isAdding, setAdding] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [isliked, setLiked] = useState<boolean>(false);
  const [isHabitAdded, setHabitAdded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    try {
      const habit_tracker_userID_token = sessionStorage.getItem(
        "habit_tracker_userID_token"
      );
      if (
        habit_tracker_userID_token != userID ||
        habit_tracker_userID_token == null
      ) {
        throw new Error();
      }
      const post = axios.get(
        `${import.meta.env.VITE_BASE_API_URL_V1}/posts/${postID}`
      );
      post
        .then((resp) => {
          if (resp.status == 200) {
            return resp.data;
          }
        })
        .then((data: Post) => {
          setPost(data);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    } catch {
      navigate("/login");
      setLoading(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [userID, postID, navigate]);

  useEffect(() => {
    try {
      const likesInfo = axios.get(
        `${
          import.meta.env.VITE_BASE_API_URL_V1
        }/posts/${postID}/${userID}/likes`
      );
      likesInfo
        .then((resp) => {
          if (resp.status == 200) {
            return resp.data;
          }
        })
        .then((data) => {
          setLikes(data["numberOfLikes"]);
          setLiked(data["isLiked"] == 1);
          setHabitAdded(data["isHabitAdded"] == 1);
        });
    } catch {
      setError(true);
    }
  }, [postID, userID]);

  const addHabit = async () => {
    if (confirm("Are you sure?")) {
      setAdding(true);
      setAddHabitBtn("Adding...");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL_V1}/posts/${userID}/habits`,
          post
        );
        if (response.status == 201) {
          alert("habit added successfully");
        }
      } catch {
        alert("Adding habit failed ! ");
      } finally {
        setAddHabitBtn("Add Habit");
        setAdding(false);
        setHabitAdded(true);
      }
    }
  };

  const handleLike = async () => {
    if (!isliked) {
      await axios.post(
        `${
          import.meta.env.VITE_BASE_API_URL_V1
        }/posts/${postID}/${userID}/likes`
      );
      setLikes(likes + 1);
    } else {
      await axios.delete(
        `${
          import.meta.env.VITE_BASE_API_URL_V1
        }/posts/${postID}/${userID}/likes`
      );
      setLikes(likes - 1);
    }
    setLiked(!isliked);
  };

  const getBack = () => {
    navigate("./../");
  };

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;
  return (
    <>
      <div className="my-3 row">
        <button
          style={{ position: "absolute" }}
          className="col-1 btn btn-secondary m-auto"
          onClick={getBack}
        >
          {"<-"}
        </button>
        <h1 className="col card-title text-center display-1 ">
          {post.heading}
        </h1>
      </div>
      <div className="card container ">
        <div className="card-body">
          <img
            className="card-img-top"
            src={post.imageLink}
            alt={`${post.heading} img`}
          />
        </div>
        <div className="card-text">
          <div className="text-center">
            {<div dangerouslySetInnerHTML={{ __html: post.content }} />}
          </div>
          <br />
          {post.querry == "" ? (
            <></>
          ) : (
            <div className="d-flex justify-content-center mt-2 mb-5">
              <button
                onClick={addHabit}
                className="btn btn-primary"
                disabled={isAdding || isHabitAdded}
              >
                {addHabitBtn}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-end me-5">
        <button
          id="likeButton"
          className={`btn btn-${isliked ? "primary" : "light"}`}
          onClick={handleLike}
        >
          <i className="bi bi-hand-thumbs-up"></i> <span>{likes}</span>
        </button>
      </div>
    </>
  );
};

export default Post;
