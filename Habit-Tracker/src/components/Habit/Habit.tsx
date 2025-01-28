import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./../home/Menu";
import Stage from "./Stage";
import Card from "./Card";
import Instructions from "../home/Instructions";
import HabitName from "./HabitName";
import Loading from "../loading_error/Loading";
import Error404 from "../loading_error/Error";

interface Users {
  userID: string;
}

interface Day {
  id: number;
  tasks: string[];
  note: string;
  date: Date;
  completed: boolean;
}

interface Habit {
  userID: string;
  postID: number | null;
  name: string;
  numberOfDays: number;
  days: Day[];
  currDay: number;
  streak: number;
  maxStreak: number;
}

const Habit = () => {
  const [userdata, setUserData] = useState<Users>();
  const [habit, setHabit] = useState<Habit>({
    userID: "",
    postID: null,
    name: "",
    numberOfDays: 0,
    days: [],
    currDay: -1,
    streak: -1,
    maxStreak: -1,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { habitID } = useParams<{ habitID: string }>();
  const [reload, setReload] = useState(false);
  const { userID } = useParams<{ userID: string }>();
  const [DayID, setDayID] = useState<number | null>(null);
  const [tasks, setTasks] = useState<string[]>([]);
  const [note, setNote] = useState<string>();
  const [date, setDate] = useState<Date>(new Date());
  const [completed, setCompleted] = useState<boolean>(false);
  const [thisDay, setThisDay] = useState<number>(-1);
  const [thisDayForRange, setThisDayForRange] = useState<number>(-1);
  const [isCardVisibile, setCardVisibility] = useState<boolean>(false);
  const [isHabitNameEditing, setHabitNameEditing] = useState<boolean>(false);

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
        - Click on the next stage (marked in blue) and select <b>Load</b> to
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

  const wonMessage = (
    <>
      <p>
        🎉 Congratulations on completing {habit.name} for {habit.numberOfDays}{" "}
        days! You can start a new habit or continue building on this one by
        adding a new habit under the same name. 💪
      </p>
      <p>Check out your badge in home page</p>
    </>
  );

  useEffect(() => {
    try {
      const habit_tracker_userID_token = localStorage.getItem(
        "habit_tracker_userID_token"
      );
      if (habit_tracker_userID_token == null) {
        throw new Error();
      } else if (userID == undefined || userID != habit_tracker_userID_token) {
        navigate(`/${habit_tracker_userID_token}`);
        return;
      }
      const userDetails = axios.get(
        `${import.meta.env.VITE_BASE_API_URL_V1}/${userID}/user-details`
      );
      userDetails
        .then((resp) => {
          if (resp.status === 200) {
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
  }, [userID, navigate]);

  useEffect(() => {
    try {
      const habitDetails = axios.get(
        `${
          import.meta.env.VITE_BASE_API_URL_V1
        }/${userID}/habits/${habitID}/${thisDayForRange}`
      );
      habitDetails
        .then((resp) => {
          if (resp.status === 200) {
            return resp.data;
          }
        })
        .then((data: Habit) => {
          setLoading(false);
          setHabit(data);

          if (data.currDay > -1) {
            const dayIndex = thisDay === -1 ? data.currDay - 1 : thisDay;
            const selectedDay = data.days[dayIndex] || null;

            setThisDay(dayIndex);
            setDayID(selectedDay?.id || null);
            setTasks(selectedDay?.tasks || []);
            setNote(selectedDay?.note || "");
            if (data.currDay > -2)
              setCompleted(data.days[dayIndex - 1]?.completed || false);

            if (dayIndex === data.currDay) {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              setDate(tomorrow);
              // } else if (dayIndex === data.currDay - 1) {
              //   setDate(new Date());
            } else if (selectedDay) {
              setDate(new Date(selectedDay.date));
            }
          }
        })
        .catch(() => {
          setLoading(false);
          setError(true);
          navigate("/404");
        });
    } catch {
      setLoading(false);
      setError(true);
      navigate("/404");
    }
  }, [userID, habitID, reload, thisDayForRange]);

  const deleteHabit = async () => {
    const confirmDelete = confirm(
      "Are you sure? \nNote: All your progress will be deleted."
    );
    if (!confirmDelete) return;
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_BASE_API_URL_V1}/${userID}/habits/${habitID}`
      );
      if (result.status === 200) {
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
    if (!habit.days[day]) {
      setThisDayForRange(day);
    }
    setCardVisibility(true);
    setThisDay(day);
    setDayID(habit.days[day] ? habit.days[day].id : null);
    setTasks(habit?.days[day] ? habit?.days[day].tasks : []);
    setNote(habit?.days[day] ? habit?.days[day].note : "");
    setCompleted(
      habit?.days[habit.currDay - 1]
        ? habit?.days[habit.currDay - 1].completed
        : false
    );
    if (day === habit?.currDay) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow);
      // } else if (day === habit?.currDay - 1) {
      //   setDate(new Date());
    } else {
      setDate(new Date(habit?.days[day].date));
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error404 />;

  return (
    <div>
      {message && (
        <div className="alert alert-light text-center mb-auto" role="alert">
          {message}
        </div>
      )}
      <div className="row">
        <div className="col-1"></div>
        <div className="p-auto col">
          <HabitName
            Habitname={habit.name}
            isEditing={isHabitNameEditing}
            setEditing={setHabitNameEditing}
            reload={reload}
            setReload={setReload}
          />
        </div>
        <div className="col-1 d-flex justify-content-end m-auto mt-3">
          <Instructions title={habit.name}>{instruction}</Instructions>
        </div>

        {habit.currDay >= habit.numberOfDays + 1 && (
          <div className="col-1 d-flex justify-content-end m-auto mt-3">
            <Instructions title={`${habit.name} - Completed 🎉`}>
              {wonMessage}
            </Instructions>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-6 d-flex justify-content-start mt-3">
          <h6>{`current streak: ${habit.streak}`}</h6>
          <div className="col-1"></div>
          <h6>{`max streak: ${habit.maxStreak}`}</h6>
        </div>
      </div>
      <div
        style={{ display: isCardVisibile ? "block" : "none" }}
        className="d-flex vh-100 position-relative"
      >
        {/* Menu */}
        <div className="row">
          <div className="col">
            <Menu
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              heading={userdata?.userID}
              options={["Home", "Edit Name", "Delete Habit"]}
              onClicks={[
                () => {
                  navigate(`/${userID}`);
                },
                () => {
                  setHabitNameEditing(true);
                  setMenuOpen(false);
                },
                deleteHabit,
              ]}
            />
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
              reload={reload}
              setReload={setReload}
              id={DayID}
              setId={setDayID}
              tasks={tasks}
              setTasks={setTasks}
              note={note}
              setNote={setNote}
              date={date}
              completed={completed}
              setCompleted={setCompleted}
              isVisibile={isCardVisibile}
              setVisibility={setCardVisibility}
              thisDay={thisDay}
              currDay={habit.currDay}
              numberOfDays={habit.numberOfDays}
              postID={habit.postID}
            />
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
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habit;
