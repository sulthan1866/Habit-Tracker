import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ChangePassword = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState<string>("Loading...");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const token = searchParams.get("token");
  const [messageStyle, setMessStyle] = useState<string>("");
  const [Message, setMessage] = useState<string | null>(null);
  const [changing, setChanging] = useState<boolean>(false);

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
        setMessage(null);
        setMessStyle("danger");
        setMessage("Invalid or expired link");
        setEmail("Failed to fetch E-Mail");
      }
    };
    getEmail();
  }, [token]);

  const changePassword = async () => {
    setMessage(null);
    setMessStyle("danger");
    if (password === "" || confirm === "") {
      setMessage("Fill in the fields to register");
      return;
    }
    if (password.length < 8) {
      setMessage("Password should contain atleast 8 character");
      return;
    }
    if (password != confirm) {
      setMessage("Password and confirm password are not equal");
      return;
    }
    try {
      setChanging(true);
      const result = await axios.post(
        `${
          import.meta.env.VITE_BASE_API_URL_V1
        }/forgot-password?token=${token}`,
        { email, password }
      );
      if (result.status == 200) {
        setMessStyle("success");
        setMessage("Password changed successfully");
      }
    } catch {
      setMessage("Process failed");
    } finally {
      setChanging(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h3 className="text-center mb-4">Set New Password</h3>
            {Message && (
              <div
                className={`alert alert-${messageStyle} text-center`}
                role="alert"
              >
                {Message}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
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
              <label className="form-label">New Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter new Password"
                autoFocus
                readOnly={changing}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirom New Password</label>
              <input
                onChange={(e) => setConfirm(e.target.value)}
                id="confirm"
                type="password"
                className="form-control"
                placeholder="Confirm your password"
                readOnly={changing}
                required
              />
            </div>
            <button
              disabled={changing}
              onClick={changePassword}
              className="btn btn-primary w-100 mb-2"
            >
              {changing ? "Changing your Password" : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
