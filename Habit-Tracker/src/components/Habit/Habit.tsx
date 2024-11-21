import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./../home/Menu";
import Stage from "./Stage";
import Card from "./Card";

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
  userID: string;
  name: string;
  numberOfDays: number;
  days: Day[];
  currDay: number;
}

const Habit = () => {
  const [userdata, setUserData] = useState<Users>();
  const [habit, setHabit] = useState<Habit>({
    userID: "",
    name: "",
    numberOfDays: -1,
    days: [],
    currDay: -1,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { habitID } = useParams<{ habitID: string }>();
  const { userID } = useParams<{ userID: string }>();
  const [tasks, setTasks] = useState<string[]>();
  const [note, setNote] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [thisDay, setThisDay] = useState<number>(-1);
  const [isCardVisibile, setCardVisibility] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const habit_tracker_userID_token = sessionStorage.getItem(
        "habit_tracker_userID_token"
      );
      if (habit_tracker_userID_token != userID) {
        throw new Error();
      }
      const userDetails = axios.get(
        `${import.meta.env.VITE_BASE_API_URL_V1}/${userID}/user-details`
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
  }, [navigate, userID]);
  useEffect(() => {
    try {
      const userDetails = axios.get(
        `${import.meta.env.VITE_BASE_API_URL_V1}/${userID}/habits/${habitID}`
      );
      userDetails
        .then((resp) => {
          if (resp.status == 200) {
            return resp.data;
          }
        })
        .then((data: Habit) => {
          setLoading(false);
          setHabit(data);
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
  }, [navigate, habitID, userID]);

  const deleteHabit = async () => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_BASE_API_URL_V1}/${userID}/habits/${habitID}`
      );
      if (result.status == 200) {
        setMessage("Habit deleted successfully");
        setTimeout(() => {
          navigate(`/${userID}`);
        }, 3000);
      }
    } catch {
      setMessage("Delete failed : try again");
    }
  };

  const onStageSelect = (day: number) => {
    setCardVisibility(true);
    setThisDay(day);
    if (day == habit?.currDay) {
      setTasks([]);
      setNote(undefined);
      setDate(new Date());
      return;
    }
    setTasks(habit?.days[day].tasks);
    setNote(habit?.days[day].note);
    setDate(habit?.days[day].date);
  };

  if (loading) return <h1>LOADING</h1>;
  if (error) return <h1>ERROR</h1>;

  return (
    <div
      style={{ display: isCardVisibile ? "block" : "none" }}
      className="d-flex vh-100 position-relative"
    >
      {/* Sidebar */}
      <div className="row">
        <div className="col">
          <Menu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            heading={userdata?.userID}
            options={["Home", "Delete Habit"]}
            onClicks={[
              () => {
                navigate(`/${userID}`);
              },
              deleteHabit,
            ]}
          ></Menu>
        </div>
        <div className="col">
          {message && (
            <div className="alert alert-light text-center mb-auto" role="alert">
              {message}
            </div>
          )}
        </div>
        <div className="col">
          <div className="card p-3">Day={habit?.currDay}</div>
        </div>
      </div>

      {/* Main Content */}

      <div
        className={`flex-grow-1 ms-auto ${menuOpen ? "content-shifted" : ""}`}
        style={{ overflowX: "auto", whiteSpace: "nowrap", padding: "20px" }}
      >
        <div className="d-flex justify-content-center shadow">
          <Card
            tasks={tasks}
            setTasks={setTasks}
            note={note}
            setNote={setNote}
            date={date}
            setDate={setDate}
            isVisibile={isCardVisibile}
            setVisibility={setCardVisibility}
            thisDay={thisDay}
            currDay={habit.currDay}
          ></Card>
        </div>
        {/* Scrollable Content */}
        <div className="d-inline-flex mt-5 d-flex align-items-center vh-100">
          {[...Array(habit?.numberOfDays)].map((_, i) => (
            <div
              key={i}
              onClick={() => {
                onStageSelect(i);
              }}
            >
              <Stage
                num={i <= habit?.currDay ? `${i + 1}` : "🔒"}
                currDay={habit?.currDay}
              ></Stage>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Habit;
