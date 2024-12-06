import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface Props {
  Habitname: string;
  isEditing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const HabitName = ({
  Habitname,
  isEditing,
  setEditing,
  reload,
  setReload,
}: Props) => {
  const { userID } = useParams<{ userID: string }>();
  const { habitID } = useParams<{ habitID: string }>();
  const [name, setName] = useState<string>(Habitname);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setSaving] = useState<boolean>(false);

  const saveHabitName = async () => {
    if (name.length > 250) {
      setMessage("Max length exceeded");
      return;
    }
    try {
      setSaving(true);
      const result = await axios.put(
        `${import.meta.env.VITE_BASE_API_URL_V1}/${userID}/habits/${habitID}`,
        { name }
      );
      if (result.status == 202) {
        setReload(!reload);
        setEditing(false);
        setMessage(null);
      }
    } catch {
      setMessage("Process failed");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div>
      {message && <div className="alert alert-danger">{message}</div>}
      {isEditing ? (
        <div className="col-md-5">
          <input
            className=" mt-5 text-wrap form-control fs-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={!isEditing}
          />
        </div>
      ) : (
        <div>
          <h3 className="mt-5 text-wrap badge bg-primary fs-2">{Habitname}</h3>
        </div>
      )}
      {isEditing && (
        <div className="row">
          <div className="col-1 m-1">
            <button
              onClick={() => setEditing(false)}
              className="btn btn-danger"
            >
              cancel
            </button>
          </div>
          <div className="col-1 ms-5 m-1">
            <button
              onClick={saveHabitName}
              className="btn btn-success"
              disabled={isSaving}
            >
              {isSaving ? "saving..." : "save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitName;
