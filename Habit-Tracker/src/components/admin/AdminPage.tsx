import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [postID, setPostID] = useState<number>(0);
  const [response, setResponse] = useState<string>("");

  useEffect(() => {
    if (prompt() != import.meta.env.VITE_POST_PASSWORD) {
      navigate("/login");
    }
  }, [navigate]);

  const deletePost = async () => {
    setResponse("Loading");
    const resp = await axios.delete(
      `${import.meta.env.VITE_BASE_API_URL_V1}/posts/${postID}`
    );
    if (resp.status == 200) {
      setResponse("deleted");
    }
  };

  return (
    <div>
      <h1>AdminPage</h1>
      <Link to="add">
        <button className="btn btn-dark">Add Post</button>
      </Link>
      <Link to="edit">
        <button className="btn btn-dark">Edit Post</button>
      </Link>
      <input
        type="text"
        value={postID}
        onChange={(e) => {
          setPostID(Number(e.target.value));
        }}
      />
      <button className="btn btn-dark" onClick={deletePost}>
        delete
      </button>
      <p>{response}</p>
    </div>
  );
};

export default AdminPage;
