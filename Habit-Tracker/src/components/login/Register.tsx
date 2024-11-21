import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [userID, setuserID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registering, setRegistering] = useState<boolean>(false);

  const addUser = async () => {
    if (userID === "" || password === "")
      setErrorMessage("Fill in the fields to register");
    else
      try {
        setRegistering(true);
        const result = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL_V1}/register`,
          { userID: userID, password: password }
        );

        if (result.status == 201) {
          setErrorMessage(null);
          navigate("/login");
        }
      } catch {
        setErrorMessage("User with this user id already exixts");
      } finally {
        setRegistering(false);
      }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h3 className="text-center mb-4">Register</h3>
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
            <button
              disabled={registering}
              onClick={addUser}
              className="btn btn-primary w-100 mb-2"
            >
              {registering ? "Creating your Account" : "Create New Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
