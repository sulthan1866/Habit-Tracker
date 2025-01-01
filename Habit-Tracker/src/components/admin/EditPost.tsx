import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Post {
  postID: number;
  heading: string;
  content: string;
  imageLink: string;
  querry: string;
}

const EditPost = () => {
  const [numberOfDays, setNumberOfDays] = useState<number>();
  const [heading, setHeading] = useState<string>();
  const [content, setContent] = useState<string>();
  const [imageLink, setImgLink] = useState<string>();
  const [querry, setQuerry] = useState<string>();
  const [postID, setPostID] = useState<number>();
  const [post, setPost] = useState<Post | null>(null);
  const [response, setResponse] = useState<string>("");

  const navigate = useNavigate();
  useEffect(() => {
    if (prompt() != import.meta.env.VITE_POST_PASSWORD) {
      navigate("/login");
    }
  }, [navigate]);

  const getPost = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL_V1}/posts/${postID}`
      );
      if (response.status == 200) {
        setPost(response.data);
        setHeading(post?.heading);
        setContent(post?.content);
        setImgLink(post?.imageLink);
        setQuerry(post?.querry);
        setPostID(post?.postID);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const savePost = async () => {
    setResponse("Loading...");
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_API_URL_V1}/posts/${postID}`,
      [
        { heading: import.meta.env.VITE_POST_PASSWORD },
        { postID, numberOfDays, heading, content, imageLink, querry },
      ]
    );
    if (response.status == 202) {
      setResponse("Saved");
    }
  };
  return (
    <div>
      <h1>EditPost</h1>

      <input
        type="text"
        value={postID}
        onChange={(e) => {
          setPostID(Number(e.target.value));
        }}
      />
      <button onClick={getPost}>get Post</button>

      <>
        <input
          type="text"
          value={numberOfDays}
          onChange={(e) => setNumberOfDays(Number(e.target.value))}
          placeholder="num of days"
        />
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="heading"
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="content"
        />
        <input
          type="text"
          value={imageLink}
          onChange={(e) => setImgLink(e.target.value)}
          placeholder="img link"
        />
        <input
          type="text"
          value={querry}
          onChange={(e) => setQuerry(e.target.value)}
          placeholder="querry"
        />
        <button onClick={savePost}>save</button>
      </>
      <p>{response}</p>
    </div>
  );
};

export default EditPost;
