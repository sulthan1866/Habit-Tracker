import { useState } from "react";

interface Props {
  tasks: string[];
  setTasks: React.Dispatch<React.SetStateAction<string[]>>;
  setChanges: React.Dispatch<React.SetStateAction<boolean>>;
  postID: number | null;
}

const AddTask = ({ tasks, setTasks, setChanges, postID }: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const load = () => {
    if (tasks) {
      for (let i = 0; i < tasks.length; i++) {
        addTask(tasks[i]);
      }
    }
    setLoaded(true);
  };

  const addTask = (task: string | null) => {
    const newTask = document.getElementById("task") as HTMLInputElement;
    if (newTask && newTask.value == "" && !task) return;

    const text = task ? task : newTask.value;
    const panel = document.getElementById("added");
    const taskElement = document.createElement("div");
    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.classList.add("btn", "btn-danger", "card-title");
    delBtn.onclick = () => {
      if (delBtn.textContent == "X") {
        delBtn.textContent = "?";
        return;
      }
      taskElement?.remove();
      setTasks(tasks.filter((task) => task != text));
      setChanges(true);
    };
    delBtn.onblur = () => {
      delBtn.textContent = "X";
    };
    taskElement.innerHTML = text;
    taskElement.classList.add("bg-light", "rounded", "pt-1", "px-1", "m-1");
    if (!postID) taskElement.appendChild(delBtn);
    panel?.appendChild(taskElement);
    if (!task) {
      tasks?.push(newTask.value);
      setTasks(tasks);
      newTask.value = "";
      setChanges(true);
      newTask.focus();
    }
  };
  return (
    <>
      <div
        style={{ visibility: loaded ? "visible" : "hidden" }}
        className="container row"
      >
        {!postID && (
          <div className="w-50 col">
            <h4>Add Task</h4>
            <input id="task" type="text" className="form-control" />
            <button onClick={() => addTask(null)} className="btn btn-info mt-3">
              Add
            </button>
          </div>
        )}
        <div className="w-50 col">
          <div id="added"></div>
        </div>
      </div>
      <button
        style={{ visibility: loaded ? "hidden" : "visible" }}
        onClick={load}
        className="btn btn-light"
      >
        {"Load tasks"}
      </button>
    </>
  );
};

export default AddTask;
