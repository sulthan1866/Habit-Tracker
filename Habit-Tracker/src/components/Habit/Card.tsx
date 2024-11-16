import { useState } from "react";
import "./card.css";
import { Modal } from "react-bootstrap";
import AddTask from "./AddTask";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Props {
  tasks: string[] | undefined;
  setTasks: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  note: string | undefined;
  setNote: React.Dispatch<React.SetStateAction<string | undefined>>;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
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
  setDate,
  isVisibile,
  setVisibility,
  thisDay,
  currDay,
}: Props) {
  const [isflipped, flip] = useState<boolean>(true);
  const { userID } = useParams<{ userID: string }>();
  const { habitID } = useParams<{ habitID: string }>();
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

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
        `${import.meta.env.VITE_BASE_API_URL_V1}/${userID}/habits/${habitID}`,
        { tasks: tasks, date: date, note: note }
      );
      if (result.status == 202) {
        setMessage("Saved");
      }
    } catch {
      setMessage("Error");
    } finally {
      setSaving(false);
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
            {message && (
              <div className="alert alert-info text-center" role="alert">
                {message}
              </div>
            )}
            <div style={flipStyle} className="flip-card-inner">
              <div className="card flip-card-front">
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
                    <div className="col-9"></div>
                    <div className="col-1">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setVisibility(false);
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                  <h4>
                    {currDay == thisDay ? (
                      <>
                        <label>Set Date</label>
                        <input
                          onChange={(e) => {
                            setDate(new Date(Date.parse(e.target.value)));
                          }}
                          type="date"
                          className="form-control"
                        />
                      </>
                    ) : date ? (
                      date.toString()
                    ) : (
                      "Locked"
                    )}
                  </h4>
                  {currDay > thisDay &&
                    tasks?.map(
                      (task, i) =>
                        task && (
                          <div key={i}>
                            <input type="checkbox" />
                            <label>{tasks ? task : "Locked"}</label>
                          </div>
                        )
                    )}
                  {currDay == thisDay && (
                    <AddTask tasks={tasks} setTasks={setTasks}></AddTask>
                  )}
                </div>
              </div>
              <div className="container flip-card-back card">
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
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setVisibility(!isVisibile);
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col">
                      <textarea
                        rows={6}
                        className=" flex-grow-1 form-control"
                        value={currDay >= thisDay ? note : "Locked"}
                        onChange={(e) => {
                          setNote(e.target.value);
                        }}
                      ></textarea>
                      <div className="row m-3">
                        <div className="col-9"></div>
                        {currDay == thisDay && (
                          <div className="col-1">
                            <button
                              className="btn btn-info"
                              disabled={saving}
                              onClick={save}
                            >
                              {saving ? "saving..." : "save"}
                            </button>
                          </div>
                        )}
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
