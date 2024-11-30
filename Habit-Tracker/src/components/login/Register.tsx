import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [userID, setuserID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const token = searchParams.get("token");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registering, setRegistering] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("loding...");

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
        }
      } catch {
        setErrorMessage(null);
        setErrorMessage("Invalid or expired link");
        setEmail("Failed to fetch E-Mail");
      }
    };
    getEmail();
  }, [token]);

  const addUser = async () => {
    setErrorMessage(null);
    if (userID === "" || password === "")
      setErrorMessage("Fill in the fields to register");
    else if (password.length < 8) {
      setErrorMessage("Password should contain atleast 8 character");
    }else
      try {
        setRegistering(true);
        const result = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL_V1}/register?token=${token}`,
          { userID, email, password }
        );
        if (result.status == 201) {
          navigate("/login");
        }
      } catch {
        setErrorMessage("User with this user id or E-Mail already exixts");
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
              <label htmlFor="email" className="form-label">
                E-Mail
              </label>
              <input
                id="email"
                type="text"
                className="form-control"
                value={email}
                readOnly
              />
            </div>
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
                readOnly={registering}
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
                readOnly={registering}
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
export default Register;
