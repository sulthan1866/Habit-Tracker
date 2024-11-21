import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./../home/Menu";
import Stage from "./Stage";
import Card from "./Card";
import Instructions from "../home/Instructions";

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
    numberOfDays: 0,
    days: [],
    currDay: -1,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { habitID } = useParams<{ habitID: string }>();
  const { userID } = useParams<{ userID: string }>();
  const [tasks, setTasks] = useState<string[]>([]);
  const [note, setNote] = useState<string>();
  const [date, setDate] = useState<Date>(new Date());
  const [thisDay, setThisDay] = useState<number>(-1);
  const [isCardVisibile, setCardVisibility] = useState<boolean>(false);

  const navigate = useNavigate();

  const instruction = (
    <>
      <h5>⚙️ How It Works</h5>
      <p>
        Each day is a stage you must complete to move forward. The goal is to
        progress step by step by accomplishing tasks and maintaining
        consistency.
      </p>
      <p>
        Schedule your tasks for tomorrow and complete them to unlock the next
        stage. Your progress is your power!
      </p>

      <h5>📊 How to Track Your Progress</h5>
      <p>
        - Click on the next stage (marked in white) and select <b>Load</b> to
        retrieve any previously scheduled tasks.
      </p>
      <p>
        - Plan your tasks for tomorrow by flipping the card (click <b>{`<`}</b>
        ), add any notes on the backside, and then click <b>Save</b> to confirm
        your tasks.
      </p>
      <p>
        - After saving, click <b>Are you doing all these tomorrow?</b> to
        finalize your schedule.
      </p>

      <h5>✅ Completing Tasks and Moving Ahead</h5>
      <p>
        On the next day, complete your scheduled tasks and mark them as{" "}
        <b>Completed</b>. Once done, move to the next stage and schedule your
        tasks for the following day.
      </p>
      <p>Keep going, and watch your habits transform into a routine!</p>
      <h5>🗑️ Deleting a Habit</h5>
      <p>
        To remove a habit, open the menu by clicking on the menu icon and select
        <b>Delete Habit</b>. Confirm the deletion, and the habit will be removed
        from your list.
      </p>
    </>
  );

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
      const habitDetails = axios.get(
        `${import.meta.env.VITE_BASE_API_URL_V1}/${userID}/habits/${habitID}`
      );
      habitDetails
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
  }, [navigate, userID, habitID]);

  const deleteHabit = async () => {
    const confirmDelete = confirm(
      "Are you sure? \nNote: All your progress will be deleted."
    );
    if (!confirmDelete) return;
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

    setTasks(habit?.days[day] ? habit?.days[day].tasks : []);
    setNote(habit?.days[day] ? habit?.days[day].note : "");
    if (day == habit?.currDay) {
      setDate(new Date(new Date()));
      date.setDate(new Date().getDate() + 1);
      setDate(date);
    } else {
      setDate(new Date(habit?.days[day].date));
    }
  };

  if (loading) return <h1>LOADING</h1>;
  if (error) return <h1>ERROR</h1>;

  return (
    <div>
      {message && (
        <div className="alert alert-light text-center mb-auto" role="alert">
          {message}
        </div>
      )}
      <div className="d-flex justify-content-end m-3">
        <Instructions title={habit.name}>{instruction}</Instructions>
      </div>
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
              isVisibile={isCardVisibile}
              setVisibility={setCardVisibility}
              thisDay={thisDay}
              currDay={habit.currDay}
            ></Card>
          </div>
          {/* Scrollable Content */}
          <div className="d-inline-flex mt-5 d-flex align-items-center vh-100">
            {[...Array(habit?.numberOfDays)].map((_, i) => (
              <div key={i}>
                <Stage
                  num={i <= habit?.currDay ? `${i + 1}` : "🔒"}
                  day={i}
                  currDay={habit?.currDay}
                  onStageSelect={onStageSelect}
                ></Stage>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habit;
