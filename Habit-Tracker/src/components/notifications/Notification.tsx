import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { requestPermissionForNotification } from "../../firebase/firebase";
import { useParams } from "react-router-dom";
import axios from "axios";
import Bell from "./Bell";

const Notification = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isPermitted, setPermitted] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const { userID } = useParams<{ userID: string }>();

  useEffect(() => {
    const result = axios.get(
      `${import.meta.env.VITE_BASE_API_URL_V1}/fcmtokens/${userID}`
    );
    result.then((response) => {
      setPermitted(response["data"] != "");
    });
  }, [userID]);

  const permitted = async () => {
    setToken(await requestPermissionForNotification());
    if (token == null) {
      alert("Try again!");
      return;
    }
    await axios.post(
      `${import.meta.env.VITE_BASE_API_URL_V1}/fcmtokens/${userID}`,
      { token, userID }
    );
    setPermitted(true);
    setShow(false);
  };
  const notPermitted = async () => {
    await axios.delete(
      `${import.meta.env.VITE_BASE_API_URL_V1}/fcmtokens/${userID}`
    );
    setPermitted(false);
    setShow(false);
  };
  return (
    <>
      <Button
        variant="light"
        onClick={() => {
          setShow(true);
        }}
      >
        <h5>
          <Bell isPermitted={isPermitted} />
        </h5>
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{"Allow Notification 🔔"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ✨ "You will receive daily reminder notifications 📅
          <br /> and be notified instantly if a new post is published 🛎️."
        </Modal.Body>
        <Modal.Footer>
          {isPermitted ? (
            <button
              className="col-3 btn btn-danger m-auto"
              onClick={notPermitted}
            >
              OFF
            </button>
          ) : (
            <button
              className="col-3 btn btn-primary m-auto"
              onClick={permitted}
            >
              ON
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Notification;
