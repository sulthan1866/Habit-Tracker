import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Menu from "./Menu";

interface Users {
  userID: string;
  habitIDs: number[];
  numberOfHabits: number;
}

interface Day {
  tasks: string[];
  note: string;
  date: Date;
}

interface Habit {
  habitID:number
  userID: string;
  name: string;
  numberOfDays: number;
  days: Day;
  currDay: number;
}

const Home = () => {
  const{userID} = useParams<{userID:string}>()
  const [userdata, setUserData] = useState<Users>();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const habit_tracker_userID_token = sessionStorage.getItem("habit_tracker_userID_token");
      if(habit_tracker_userID_token!=userID){
        throw new Error;
      }
      const userDetails = axios.get(
        `${import.meta.env.VITE_BASE_BE}/user-details/${userID}`
      );
      userDetails
        .then((resp) => {
          if (resp.status == 200) {
            return resp.data;
          }
        })
        .then((data: Users) => {
          setLoading(false);
          setUserData(data);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
          navigate("/login");
        });
    } catch {
      setLoading(false);
      setError(true);

      navigate("/login");
    }
  }, [navigate,userID]);
  useEffect(() => {
    try {
      const habit_tracker_userID_token = sessionStorage.getItem("habit_tracker_userID_token");
      if(habit_tracker_userID_token!=userID){
        throw new Error;
      }
      const userDetails = axios.get(
        `${import.meta.env.VITE_BASE_BE}/habits/${userID}`
      );
      userDetails
        .then((resp) => {
          if (resp.status == 200) {
            return resp.data;
          }
        })
        .then((data: Habit[]) => {
          setLoading(false);
          setHabits(data);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
          navigate("/login");
        });
    } catch {
      setLoading(false);
      setError(true);

      navigate("/login");
    }
  }, [navigate,userID]);

  if(loading)return <h1>LOADING</h1>
  if(error)return <h1>ERROR</h1>

  return (
    <div className="d-flex vh-100 position-relative">
      {/* Sidebar */}
      <Menu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        heading={userdata?.userID}
        options={["1", "2"]}
        onClicks={[]}
      ></Menu>

      {/* Main Content */}
      <div
        className={`flex-grow-1 ms-auto ${menuOpen ? "content-shifted" : ""}`}
        style={{ overflowX: "auto", whiteSpace: "nowrap", padding: "20px" }}
      >
        {/* Scrollable Content */}
        <div className="d-inline-flex mt-5">
          {habits.map((habit) => (
            <div
              key={habit.habitID}
              className="text-center rounded shadow mx-2"
              style={{
                minWidth: "200px",
                height: "auto",
                lineHeight: "150px",
              }}
            >
            
              <div>
                <Link to={habit.habitID.toString()}><button className="btn btn-light">{habit.name} </button></Link>
                <p>{`Progress = ${habit.currDay}/${habit.numberOfDays}`}</p>
              </div>
            </div>
          ))}
          <div className="m-auto">
            <button className="btn btn-secondary">add Habit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
