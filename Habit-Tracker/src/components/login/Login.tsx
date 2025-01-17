import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Email from "./Email";
import ForgotPassword from "./ForgotPasswordEmail";

const Login = () => {
  const navigate = useNavigate();

  const [userID, setUserID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loging, setLoging] = useState<boolean>(false);
  const [isSendingEmail, setSendingEmial] = useState<boolean>(false);
  const [isSendingPasswordEmail, setSendingPasswordEmail] =
    useState<boolean>(false);

  const isUser = async () => {
    setUserID(userID.trim());
    if (userID === "" || password === "") {
      setErrorMessage(null);
      setErrorMessage("Fill in the fields to Login");
    } else
      try {
        setLoging(true);
        const result = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL_V1}/login`,
          { userID, password }
        );

        if (result.status == 202) {
          setErrorMessage(null);
          localStorage.setItem("habit_tracker_userID_token", result.data);
          navigate(`/${result.data}`);
        }
      } catch {
        setErrorMessage(null);
        setErrorMessage("User ID or password is incorrect. Please try again.");
      } finally {
        setLoging(false);
      }
  };

  return (
    <div className="container mt-5">
      <Email
        isSendingEmail={isSendingEmail}
        setSendingEmail={setSendingEmial}
      />
      <ForgotPassword
        isSendingEmail={isSendingPasswordEmail}
        setSendingEmail={setSendingPasswordEmail}
      />
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h3 className="text-center mb-4">Login</h3>
            {errorMessage && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="userID" className="form-label">
                User ID or E-Mail
              </label>
              <input
                onChange={(e) => setUserID(e.target.value)}
                id="userID"
                type="text"
                className="form-control"
                placeholder="Enter your User ID or E-Mail"
                autoFocus
                readOnly={loging}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter your Password"
                readOnly={loging}
                required
              />
            </div>
            <button
              disabled={loging}
              onClick={isUser}
              className="btn btn-primary w-100 mb-2"
            >
              {loging ? "Loging..." : "Login"}
            </button>
            <div
              onClick={() => setSendingPasswordEmail(true)}
              className="text-center mb-2 text-primary"
              style={{ cursor: "pointer" }}
            >
              Forgot Password?
            </div>
            <div className="text-center">
              <button
                onClick={() => setSendingEmial(true)}
                className="btn btn-outline-secondary w-100"
              >
                Create New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
