import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const EmailChanged = () => {
  const [searchParams] = useSearchParams();
  const { userID } = useParams<{ userID: string }>();
  const [email, setEmail] = useState<string>("loading...");
  const [message, setMessage] = useState<string | null>(null);
  const [verifing, setverifing] = useState<boolean>(true);

  const token = searchParams.get("token");

  useEffect(() => {
    const getEmail = async () => {
      try {
        const emailResult = await axios.get(
          `${
            import.meta.env.VITE_BASE_API_URL_V1
          }/register/email?token=${token}`
        );

        if (emailResult.status == 200) {
          setEmail(emailResult.data);
          setverifing(false);
        }
      } catch {
        setMessage(null);
        setMessage("Invalid or expired link");
        setEmail("Failed to fetch E-Mail");
      }
    };
    getEmail();
  }, [token]);
  const verify = async () => {
    try {
      setverifing(true);
      const result = await axios.put(
        `${
          import.meta.env.VITE_BASE_API_URL_V1
        }/${userID}/reset-email?token=${token}`,
        { userID, email }
      );

      if (result.status == 200) {
        setMessage(null);
        setMessage("E-mail Verified successfully");
      }
    } catch {
      setMessage("Process failed");
    } finally {
      setverifing(false);
    }
  };
  return (
    <div className="container mt-5 col-md-4">
      {message && (
        <div className="alert alert-success text-center">{message}</div>
      )}
      <input type="text" className="form-control" value={email} readOnly />
      <div className="d-flex justify-content-center m-5">
        <button
          disabled={verifing}
          className="btn btn-secondary"
          onClick={verify}
        >
          Verify E-mail
        </button>
      </div>
    </div>
  );
};

export default EmailChanged;
