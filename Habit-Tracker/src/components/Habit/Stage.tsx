import React from "react";

interface Props {
  num: string;
  day:number
  currDay: number;
  onStageSelect:(day:number)=>void
}

const Stage = ({ num,day, currDay,onStageSelect}: Props) => {
  const stage: React.CSSProperties = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  };
  return (
          <button
          onClick={()=>onStageSelect(day)}
          disabled={num=="🔒"} 
            style={stage}
            className={`text-center shadow m-5 btn btn-${
              num == "🔒"
                ? "danger"
                : Number.parseInt(num) == currDay + 1
                ? "light"
                : "success"
            }`}
          >
            {num}{" "}
          </button>
        
  );
};

export default Stage;
