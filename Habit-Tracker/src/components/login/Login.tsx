import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [userID, setuserID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isUser = async () => {
    setuserID(userID.trim());
    if (userID === "" || password === "")
      setErrorMessage("Fill in the fields to Login");
    else
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL_V1}/login`,
          { userID: userID, password: password }
        );

        if (result.status == 202) {
          setErrorMessage(null);
          sessionStorage.setItem("habit_tracker_userID_token", userID);
          navigate(`/${userID}`);
        }
      } catch {
        setErrorMessage("User ID or password is incorrect. Please try again.");
      }
  };

  return (
    <div className="container mt-5">
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
                User ID
              </label>
              <input
                onChange={(e) => setuserID(e.target.value)}
                id="userID"
                type="text"
                className="form-control"
                placeholder="Enter your User ID"
                autoFocus
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
                required
              />
            </div>
            <button onClick={isUser} className="btn btn-primary w-100 mb-2">
              Login
            </button>
            <div className="text-center mb-2">
              <a href="#" className="text-decoration-none">
                Forgot Password?
              </a>
            </div>
            <div className="text-center">
              <Link to="/register">
                <button className="btn btn-outline-secondary w-100">
                  Create New Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
