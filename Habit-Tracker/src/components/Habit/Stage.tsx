import React from "react";

interface Props {
  num: string;
}

const Stage = ({ num }: Props) => {
  const stage: React.CSSProperties = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    
  };
  return (
    <div className="text-center shadow m-5" style={stage}>
      <div>{<button style={stage} className={`btn btn-${num=='🔒'?'danger':'light'}`}>{num} </button>}</div>
    </div>
  );
};

export default Stage;
