import { useState } from "react";
import "./card.css";
import { Modal } from "react-bootstrap";
import AddTask from "./AddTask";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Props {
  tasks: string[];
  setTasks: React.Dispatch<React.SetStateAction<string[]>>;
  note: string | undefined;
  setNote: React.Dispatch<React.SetStateAction<string | undefined>>;
  date: Date;
  isVisibile: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  thisDay: number;
  currDay: number;
}

function Card({
  tasks,
  setTasks,
  note,
  setNote,
  date,
  isVisibile,
  setVisibility,
  thisDay,
  currDay,
}: Props) {
  const [isflipped, flip] = useState<boolean>(false);
  const { userID } = useParams<{ userID: string }>();
  const { habitID } = useParams<{ habitID: string }>();
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [hasChanges, setChanges] = useState<boolean>(false);
  const [isCompleted, setCompleted] = useState<boolean>(false);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const CardStyle: React.CSSProperties = {
    visibility: isVisibile ? "visible" : "hidden",
    position: "absolute",
  };
  const flipStyle: React.CSSProperties = {
    transform: isflipped ? "rotateY(180deg)" : "none",
  };

  const save = async () => {
    setSaving(true);
    try {
      const result = await axios.put(
        `${
          import.meta.env.VITE_BASE_API_URL_V1
        }/${userID}/habits/${habitID}/${thisDay}`,
        { tasks: tasks, date: date, note: note }
      );
      if (result.status == 202) {
        setMessage("Saved");
        setChanges(false);
      }
    } catch {
      setMessage("Error");
    } finally {
      setSaving(false);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const closeCard = () => {
    if (!hasChanges) {
      setVisibility(false);
    } else if (!message) {
      setMessage("There are some un saved changes.(save at notes side)");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else {
      setVisibility(false);
      setChanges(false);
    }
  };
  const completed = async () => {
    const nextElement = document.getElementById("next") as HTMLButtonElement;
    nextElement.onblur = () => (nextElement.textContent = "Completed ?");
    if (nextElement.textContent == "Completed ?") {
      nextElement.textContent = "Did you?";
      return;
    }
    setMessage(
      "Todays tasks are completed ,schedule for tommorow. keep going!!!"
    );
    nextElement.disabled = true;
    setCompleted(true);
  };
  const moveNext = async () => {
    if (!isCompleted && thisDay != 0) {
      setMessage("Complete today's tasks to save it");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    } else if (!message && hasChanges) {
      setMessage("There are some un saved changes.(save at notes side)");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }
    setChanges(false);
    const r = await axios.put(
      `${
        import.meta.env.VITE_BASE_API_URL_V1
      }/${userID}/habits/${habitID}/next`,
      { timeZone }
    );
    if (r.status == 200) {
      setMessage("Let's Goo!!!!");
      setInterval(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div style={CardStyle} className="container mt-5 ">
      <div className="row justify-content-center">
        <div className="col-md-6 col-11 col-lg-6">
          <Modal
            backdrop="static"
            show={isVisibile}
            onHide={() => {
              setVisibility(false);
            }}
            className="flip-card"
          >
            <div style={flipStyle} className="flip-card-inner">
              <div className="card flip-card-front">
                {message && (
                  <div className="alert alert-info text-center" role="alert">
                    {message}
                  </div>
                )}
                <div className=" justify-content-center align-items-center">
                  <div className="row m-3">
                    <div className="col-1">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          flip(!isflipped);
                        }}
                      >
                        {">"}
                      </button>
                    </div>
                    <div className="col-9">
                      {" "}
                      <h2>{date.toDateString()}</h2>
                    </div>
                    <div className="col-1">
                      <button className="btn btn-danger" onClick={closeCard}>
                        X
                      </button>
                    </div>
                  </div>

                  {currDay > thisDay && (
                    <>
                      {currDay - 1 != thisDay ? (
                        <h3>Completed Tasks</h3>
                      ) : (
                        <h3>
                          Today's Tasks
                          <button
                            id="next"
                            className="btn btn-success ms-2"
                            onClick={completed}
                          >
                            {"Completed ?"}
                          </button>
                        </h3>
                      )}
                      <hr />
                      {tasks?.map(
                        (task, i) =>
                          task && (
                            <div
                              className="row bg-light rounded m-1 text-start"
                              key={i}
                            >
                              {thisDay == currDay - 1 && (
                                <input
                                  className="col-1 m-auto"
                                  type="checkbox"
                                />
                              )}
                              <label className=" col">{tasks}</label>
                            </div>
                          )
                      )}
                    </>
                  )}
                  {currDay == thisDay && (
                    <>
                      <h3>Schedule for Tommorow</h3>
                      <hr />
                      <AddTask
                        setChanges={setChanges}
                        tasks={tasks}
                        setTasks={setTasks}
                      ></AddTask>
                      <hr />
                      <button
                        onClick={moveNext}
                        className="btn btn-success mt-2"
                      >
                        Are you doing all these tommorow ?
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="container flip-card-back card">
                {message && (
                  <div className="alert alert-info text-center" role="alert">
                    {message}
                  </div>
                )}
                <div className="   justify-content-center align-items-center">
                  <div className="row m-3">
                    <div className="col-1">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          flip(!isflipped);
                        }}
                      >
                        {">"}
                      </button>
                    </div>
                    <div className="col-9"></div>
                    <div className="col-1">
                      <button className="btn btn-danger" onClick={closeCard}>
                        X
                      </button>
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col">
                      <h3>Add Notes</h3>
                      <hr />
                      <textarea
                        rows={6}
                        className=" flex-grow-1 form-control"
                        value={note}
                        onChange={(e) => {
                          setNote(e.target.value);
                          setChanges(true);
                        }}
                      ></textarea>
                      <div className="row m-3">
                        <div className="col-9"></div>

                        <div className="col-1">
                          <button
                            className="btn btn-info"
                            disabled={saving}
                            onClick={save}
                          >
                            {saving ? "saving..." : "save"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Card;
