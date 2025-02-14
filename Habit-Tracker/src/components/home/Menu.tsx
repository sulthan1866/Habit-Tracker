import { useNavigate } from "react-router-dom";
import "./menu.css";
import { ReactNode } from "react";
interface Props {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  heading: string | undefined;
  options: ReactNode[];
  onClicks: (() => void)[];
}

const Menu = ({ menuOpen, setMenuOpen, heading, options, onClicks }: Props) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("habit_tracker_userID_token");
    navigate("/login");
  };

  return (
    <>
      <button
        className="btn btn-secondary position-fixed"
        style={{
          top: "20px",
          left: menuOpen ? "250px" : "20px",
          transition: "left 0.3s ease",
        }}
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        {"☰"}
      </button>
      <div
        className={`position-fixed top-0 h-100 bg-dark text-white ${
          menuOpen ? "slide-in" : "slide-out"
        }`}
        style={{ width: "250px", transition: "transform 0.3s ease", zIndex: 5 }}
      >
        <div className="p-3 text-center">
          <h2 onClick={() => navigate(`/${heading}/profile`)}>
            {heading?.substring(0, 12)}
          </h2>
          <hr></hr>
          {options.map((option, i) => (
            <p key={i} onClick={onClicks[i]} style={{ cursor: "pointer" }}>
              {option}
            </p>
          ))}
          <button className="btn btn-danger" onClick={logout}>
            logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Menu;
