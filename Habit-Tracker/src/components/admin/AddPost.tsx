import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [heading, setHeading] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageLink, setImgLink] = useState<string>("");
  const [querry, setQuerry] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const navigate = useNavigate();
  useEffect(() => {
    if (prompt() != import.meta.env.VITE_POST_PASSWORD) {
      navigate("/login");
    }
  }, [navigate]);

  const addPost = async () => {
    setResponse("Loading...");
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL_V1}/posts`,
      [
        { heading: import.meta.env.VITE_POST_PASSWORD },
        { heading, numberOfDays, content, imageLink, querry },
      ]
    );
    if (response.status == 201) {
      setResponse("Added");
    }
  };
  return (
    <div>
      <h1>AddPost</h1>
      <input
        type="text"
        value={numberOfDays}
        onChange={(e) => setNumberOfDays(Number(e.target.value))}
        placeholder="number of days"
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
      <button className="btn" onClick={addPost}>
        submit
      </button>
      <p>{response}</p>
    </div>
  );
};

export default AddPost;
