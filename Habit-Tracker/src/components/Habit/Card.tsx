import { useState } from "react";
import "./card.css";

interface Props {
  tasks: string[] | undefined;
  note: string | undefined;
  setNote:React.Dispatch<React.SetStateAction<string|undefined>>;
  date: Date | undefined;
  isVisibile: boolean;
  setVisibility:React.Dispatch<React.SetStateAction<boolean>>;
  
}

function Card({ tasks, note,setNote, date, isVisibile,setVisibility }: Props) {
  const [isflipped, flip] = useState<boolean>(true);

  const CardStyle: React.CSSProperties = {
    visibility: isVisibile ? "visible" : "hidden",
    position: "absolute",
  };
  const flipStyle: React.CSSProperties = {
    transform: isflipped ? "rotateY(180deg)" : "none",
  };

  return (
    <div style={CardStyle} className="container mt-5 ">
      <div className="row justify-content-center">
        <div className="col-md-6 col-11 col-lg-6">
          <div className="flip-card ">
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
                        </div><div className="col-9"></div>
                        <div className="col-1">
                            <button className="btn btn-danger" onClick={()=>{setVisibility(false)}}>X</button>
                        </div>
                      </div>
                    <h4>{(date)?date.toString():"Locked"}</h4>
                    {
                      tasks?.map((task) => (
                        <>
                          <input type="checkbox" />
                          <label>{(tasks)?task:'Locked'}</label>
                        </>
                      ))}
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
                    </div><div className="col-9"></div>
                    <div className="col-1">
                        <button className="btn btn-danger" onClick={()=>{setVisibility(!isVisibile)}}>X</button>
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col">
                      <textarea
                      rows={6}
                        className=" flex-grow-1 form-control"
                        value={(note)?note:'Locked'}
                        onChange={(e) => {
                          setNote(e.target.value);
                        }}
                      ></textarea>
                      <div className="row m-3">
                    <div className="col-9"></div>
                    <div className="col-1">
                        <button className="btn btn-info" >save</button>
                    </div>
                  </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
