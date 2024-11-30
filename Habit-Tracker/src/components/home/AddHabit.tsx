import axios from "axios";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

interface Props {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setAdding: React.Dispatch<React.SetStateAction<boolean>>;
  isAdding: boolean;
}

const AddHabit = ({ reload, setReload, setAdding, isAdding }: Props) => {
  const [Message, setMessage] = useState<string | null>(null);
  const [messStyle, setMessStyle] = useState<string>("");
  const [createdMessage, setCreatedMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { userID } = useParams<{ userID: string }>();
  const [newHabit, setNewHabit] = useState<string>("");
  const [newHabitDays, setNewHabitDays] = useState<number>(0);

  const addHabit = async () => {
    setCreatedMessage(null);
    setMessage(null);
    setMessStyle("danger");
    if (newHabit == "" || newHabitDays == 0) {
      setMessage("Fill in the fields");
    } else if (newHabitDays < 21 || newHabitDays > 250) {
      setMessage("please enter number of days between 21 and 250 days");
    } else
      try {
        setLoading(true);
        const result = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL_V1}/${userID}/habits`,
          { name: newHabit, numberOfDays: newHabitDays }
        );

        if (result.status == 201) {
          setMessage(null);
          setMessStyle("success");
          setCreatedMessage(
            `Habit added successfully: ${newHabit} for ${newHabitDays} days`
          );
          setNewHabit(result.data.name);
          setNewHabitDays(result.data.numberOfDays);
        }
      } catch {
        setCreatedMessage(null);
        setMessage("Add habit failed");
      } finally {
        setLoading(false);
      }
  };

  const close = () => {
    setAdding(false);
    setReload(!reload);
    setNewHabit("");
    setNewHabitDays(0);
  };

  return (
    <>
      <div className="container mt-5">
        <Modal
          show={isAdding}
          backdrop="static"
          className="row justify-content-center"
        >
          <div className="col">
            <div className="card p-4 shadow ">
              <div
                style={{ cursor: "pointer" }}
                className="d-flex justify-content-end btn-danger btn ms-auto"
                onClick={close}
              >
                X
              </div>
              <h3 className="text-center mb-4">Add Habit</h3>
              {Message && (
                <div
                  className={`alert alert-${messStyle} text-center`}
                  role="alert"
                >
                  {Message}
                </div>
              )}
              {createdMessage && (
                <div className="alert alert-success text-center" role="alert">
                  {createdMessage}
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">New Habit</label>
                <input
                  onChange={(e) => setNewHabit(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Enter your Habit"
                  autoFocus
                  readOnly={loading}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Number Of Days</label>
                <input
                  onChange={(e) =>
                    setNewHabitDays(Number.parseInt(e.target.value, 10))
                  }
                  type="number"
                  className="form-control"
                  placeholder="Enter number of days"
                  readOnly={loading}
                  required
                />
              </div>
              <button
                disabled={loading}
                onClick={addHabit}
                className="btn btn-primary m-auto"
              >
                {loading ? "Adding..." : "Add new Habit"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AddHabit;
