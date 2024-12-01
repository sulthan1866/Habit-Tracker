import axios from "axios";
import { useState } from "react";
import { Modal } from "react-bootstrap";

interface Props {
  isSendingEmail: boolean;
  setSendingEmail: React.Dispatch<React.SetStateAction<boolean>>;
}
const ForgotPassword = ({ isSendingEmail, setSendingEmail }: Props) => {
  const [Message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [messageStyle, setMessStyle] = useState<string>("");
  const [sendingRequest, setSendingRequest] = useState<boolean>(false);

  const sendEmail = async () => {
    if (email == "") {
      setMessStyle("danger");
      setMessage("Please fill all fields");
      return;
    }

    try {
      setMessage(null);
      setSendingRequest(true);
      const result = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL_V1}/send-password`,
        { email }
      );

      if (result.status == 202) {
        setMessStyle("info");
        setMessage("Change Password link sent successfully");
      } else {
        setMessStyle("danger");
        setMessage("Change Password link sent already (check spam message)");
      }
    } catch {
      setMessStyle("danger");
      setMessage("User with this E-Mail dosen't exixts");
    } finally {
      setSendingRequest(false);
    }
  };

  const close = () => {
    setMessage(null);
    setSendingEmail(false);
    setEmail("");
  };

  return (
    <div className="container mt-5">
      <Modal
        show={isSendingEmail}
        backdrop="static"
        className="row justify-content-center"
      >
        <div className="row justify-content-center">
          <div className="card p-4 shadow">
            <div className="d-flex justify-content-end">
              <button onClick={close} className="btn btn-danger">
                X
              </button>
            </div>
            <h3 className="text-center mb-4">Get Reset Password Link</h3>
            {Message && (
              <div
                className={`alert alert-${messageStyle} text-center`}
                role="alert"
              >
                {Message}
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">E-Mail ID</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="text"
                className="form-control"
                placeholder="Enter your E-Mail"
                autoFocus
                readOnly={sendingRequest}
                required
              />
            </div>
            <button
              disabled={sendingRequest}
              onClick={sendEmail}
              className="btn btn-primary w-100 mb-2"
            >
              {sendingRequest ? "Sending link..." : "Get link"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
