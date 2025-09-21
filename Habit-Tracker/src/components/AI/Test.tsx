import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Test = () => {
  const { userID } = useParams<{ userID: string }>();
  const [prompt, setPrompt] = useState<string>("");
  const [responseText, setResponseText] = useState<string>("");

  const getAiText = async () => {
    const result = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL_V1}/${userID}/generate`,
      { prompt }
    );
    if (result.status == 202) {
      setResponseText("your schduled task is /n " + result.data);
    }
  };
  return (
    <div>
      <p>{responseText}</p>
      <input
        type="text"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      <button onClick={getAiText}>get</button>
    </div>
  );
};

export default Test;
