import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Menu from "./Menu";
import AddHabit from "./AddHabit";
import Instructions from "./Instructions";
import "./badge.css";
import Loading from "../loading_error/Loading";
import Error404 from "../loading_error/Error";

interface Users {
  userID: string | undefined;
  email: string;
}

interface Habit {
  habitID: number;
  name: string;
  numberOfDays: number;
  currDay: number;
}

const Home = () => {
  const { userID } = useParams<{ userID: string }>();
  const [reload, setReload] = useState(false);
  const [userdata, setUserData] = useState<Users>({
    userID: "",
    email: "",
  });
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdding, setAdding] = useState<boolean>(false);

  const instruction = (
    <>
      <h5>🌟 Adding a New Habit</h5>
      <p>
        Click on the <b>Add Habit</b> button, specify the habit you want to
        build, and set the number of days you aim to follow it. Let’s start your
        journey toward a better you!
      </p>
      <h5>🏅 Getting Badges</h5>
      <p>
        After completing a habit, you will see a <b>Complete Habit</b> option at
        the final stage. Click it to earn badges.
      </p>
      <p>The badges are awarded as follows:</p>
      <ul>
        <li>
          🏅 <b>Gold Badge</b>: Awarded for completing a habit with at least{" "}
          <b>200 days</b>.
        </li>
        <li>
          🥈 <b>Silver Badge</b>: Awarded for completing a habit with at least{" "}
          <b>100 days</b>.
        </li>
        <li>
          🥉 <b>Bronze Badge</b>: Awarded for completing a habit with at least{" "}
          <b>50 days</b>.
        </li>
        <li>
          🔰 <b>Novice Badge</b>: Awarded for completing a habit with fewer than{" "}
          <b>50 days</b>.
        </li>
      </ul>
    </>
  );

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const habit_tracker_userID_token = sessionStorage.getItem(
        "habit_tracker_userID_token"
      );
      if (
        habit_tracker_userID_token != userID ||
        habit_tracker_userID_token == null
      ) {
        throw new Error();
      }
      const userDetails = axios.get(
        `${import.meta.env.VITE_BASE_API_URL_V1}/${userID}/user-details`
      );
      const habitDetails = axios.get(
        `${import.meta.env.VITE_BASE_API_URL_V1}/${userID}/habits`
      );
      userDetails
        .then((resp) => {
          if (resp.status == 200) {
            return resp.data;
          }
        })
        .then((data) => {
          setUserData({
            userID: userID,
            email: data.email,
          });
        })
        .catch(() => {
          setLoading(false);
          setError(true);
          navigate("/login");
        });
      habitDetails
        .then((resp) => {
          if (resp.status == 200) {
            return resp.data;
          }
        })
        .then((data: Habit[]) => {
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
    } finally {
      setLoading(false);
    }
  }, [navigate, userID, reload]);

  const addHabit = () => {
    setAdding(true);
  };

  if (loading) return <Loading />;
  if (error) return <Error404 />;

  return (
    <div>
      <div className="d-flex justify-content-end m-3">
        <Instructions title="Welcome to Our Habit Tracker App!">
          {instruction}
        </Instructions>
      </div>
      <div className="d-flex vh-100 position-relative">
        {/* Sidebar */}
        <Menu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          heading={userdata?.userID}
          options={["Profile", "Posts"]}
          onClicks={[
            () => {
              navigate("profile");
            },
            () => {
              navigate("posts");
            },
          ]}
        />
        {/* Main Content */}
        <div
          className={`flex-grow-1 ms-auto ${menuOpen ? "content-shifted" : ""}`}
          style={{ overflowX: "auto", whiteSpace: "nowrap", padding: "20px" }}
        >
          {/* Scrollable Content */}
          <div className="d-inline-flex mt-5">
            {isAdding && (
              <div
                style={{ position: "absolute", alignSelf: "center" }}
                className="col-12 mt-4 d-flex justify-content-center"
              >
                <AddHabit
                  reload={reload}
                  setReload={setReload}
                  setAdding={setAdding}
                  isAdding={isAdding}
                />
              </div>
            )}
            {habits.map((habit) => (
              <div
                id="habit-holder"
                key={habit.habitID}
                className="text-center rounded shadow mx-2"
                style={{
                  minWidth: "200px",
                  height: "auto",
                  lineHeight: "150px",
                }}
              >
                <div>
                  <Link to={habit.habitID.toString()}>
                    <input
                      type="text"
                      readOnly
                      value={habit.name}
                      className="btn btn-light mx-1"
                    />
                  </Link>
                  <p>{`Progress = ${habit.currDay - 1}/${
                    habit.numberOfDays
                  }`}</p>
                </div>
              </div>
            ))}

            <div className="m-auto">
              <button className="btn btn-secondary" onClick={addHabit}>
                Add Habit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
