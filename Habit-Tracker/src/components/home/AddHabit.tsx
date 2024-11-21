import axios from "axios";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

interface Props {
  setAdding: React.Dispatch<React.SetStateAction<boolean>>;
  isAdding: boolean;
}

const AddHabit = ({ setAdding, isAdding }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createdMessage, setCreatedMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { userID } = useParams<{ userID: string }>();
  const [newHabit, setNewHabit] = useState<string>("");
  const [newHabitDays, setNewHabitDays] = useState<number>(0);
  const addHabit = async () => {
    setCreatedMessage(null);
    setErrorMessage(null);
    if (newHabit == "" || newHabitDays == 0) {
      setErrorMessage("Fill in the fields");
    } else if (newHabitDays < 21 || newHabitDays > 400) {
      setErrorMessage("please enter number of days between 21 and 400 days");
    } else
      try {
        setLoading(true);
        const result = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL_V1}/${userID}/habits`,
          { name: newHabit, numberOfDays: newHabitDays }
        );

        if (result.status == 201) {
          setErrorMessage(null);
          setCreatedMessage("Habit added successfully");
          setNewHabit(result.data.name);
          setNewHabitDays(result.data.numberOfDays);
        }
      } catch {
        setCreatedMessage(null);
        setErrorMessage("Add habit failed");
      } finally {
        setLoading(false);
      }
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
                onClick={() => {
                  setAdding(false);
                }}
              >
                X
              </div>
              <h3 className="text-center mb-4">Add Habit</h3>
              {errorMessage && (
                <div className="alert alert-danger text-center" role="alert">
                  {errorMessage}
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
