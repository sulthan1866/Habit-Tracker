import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../home/Menu";

interface Users {
  userID: string | undefined;
  email: string;
  badges: Badge[];
}

interface Badge {
  name: string;
  nameDayMap: [name: string, numOfDays: number][];
}
const Profile = () => {
  const { userID } = useParams<{ userID: string }>();
  const [reload, setReload] = useState(false);
  const [userdata, setUserData] = useState<Users>({
    userID: "",
    email: "",
    badges: [],
  });
  const [newUserID, setNewUserID] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [Message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [sendingMail, setSendingMail] = useState<boolean>(false);
  const [isEditing, setEditing] = useState<boolean>(false);
  const badgeMap = new Map([
    ["gold", "🏅"],
    ["silver", "🥈"],
    ["bronze", "🥉"],
    ["novice", "🔰"],
  ]);
  const navigate = useNavigate();

  const transformBadges = (
    badgesData: Record<string, Record<string, number>>
  ): Badge[] => {
    return Object.entries(badgesData).map(([key, value]) => ({
      name: key,
      nameDayMap: Object.entries(value) as [string, number][],
    }));
  };

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
      userDetails
        .then((resp) => {
          if (resp.status == 200) {
            setLoading(false);
            return resp.data;
          }
        })
        .then((data) => {
          setUserData({
            userID: userID,
            email: data.email,
            badges: transformBadges(data.badges),
          });
          setNewUserID(userID);
          setNewEmail(data.email);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
          navigate("/login");
        });
    } catch {
      navigate("/login");
    }
  }, [reload, navigate, userID]);

  const sendResetEmail = async () => {
    setSendingMail(true);
    setEditing(false);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL_V1}/${userID}/send-reset-email`,
        { newEmail }
      );
      if (result.status == 202) {
        setReload(!reload);
        setMessage("verification Link sent successfully");
      } else if (result.status == 208) {
        setMessage("Registeration link sent already (check spam message)");
      }
    } catch {
      setMessage("process failed");
    } finally {
      setSendingMail(false);
    }
  };

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;
  return (
    <div>
      <Menu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        heading={userdata.userID}
        options={["home"]}
        onClicks={[
          () => {
            navigate(`/${userID}`);
          },
        ]}
      ></Menu>
      <div className="container">
        {Message && (
          <div className="alert alert-danger text-center">{Message}</div>
        )}
        <div className="row">
          <div className="col-lg-5 col-11 m-3">
            <div className="row m-2">
              <label htmlFor="userid">
                User ID
                <input
                  className="form-control "
                  type="text"
                  value={newUserID}
                  onChange={(e) => setNewUserID(e.target.value)}
                  readOnly
                />
                {/* <div className="justify-content-end d-flex">
                  {isEditing ? (
                    <button className="btn btn-success" onClick={saveChanges}>
                      save?
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => setEditing(true)}
                    >
                      edit
                    </button>
                  )}
                </div> */}
              </label>
            </div>
            <div className="row m-2">
              <label htmlFor="email">
                E-Mail:
                <input
                  className="form-control "
                  type="text"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  readOnly={!isEditing}
                />
                <button
                  className="btn btn-success"
                  disabled={sendingMail}
                  onClick={() => {
                    setEditing(!isEditing);
                    if (isEditing) {
                      sendResetEmail();
                    }
                  }}
                >
                  {isEditing ? "verify E-Mail?" : "edit E-Mail"}
                </button>
              </label>
            </div>
          </div>
          <div className="col-lg-5 col-11">
            <div
              className={` ms-auto`}
              style={{
                padding: "20px",
              }}
            >
              <div className="mt-5">
                {userdata?.badges.length > 0 ? (
                  userdata.badges.map((badge, i) => (
                    <div key={i}>
                      <h5>{`${badge.name} badges`}</h5>
                      {badge.nameDayMap.map((nameDay, i) => (
                        <>
                          <span
                            key={i}
                            className={`badge badge-${badge.name} position-relative d-inline-block`}
                            tabIndex={0}
                          >
                            {badgeMap.get(badge.name)}
                            <div className="badge-info">
                              {`${nameDay[0]} for ${nameDay[1]} days`}
                            </div>
                          </span>
                        </>
                      ))}
                      <hr />
                    </div>
                  ))
                ) : (
                  <h5>No badges yet</h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
