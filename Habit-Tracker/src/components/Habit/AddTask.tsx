interface Props {
  tasks: string[] | undefined;
  setTasks: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

const AddTask = ({ tasks, setTasks }: Props) => {
  const addTask = () => {
    const newTask = document.getElementById("task") as HTMLInputElement;
    if (newTask.value == "") return;
    const panel = document.getElementById("added");
    const taskElement = document.createElement("new-task");
    taskElement.textContent = newTask.value;
    taskElement.classList.add("row", "text-dark", "card");
    panel?.appendChild(taskElement);
    tasks?.push(newTask.value);
    setTasks(tasks);
    newTask.value = "";
  };
  return (
    <div className="container row">
      <div className="w-50 col-6">
        <h3>Add task</h3>
        <input id="task" type="text" className="form-control" />
        <button onClick={addTask} className="btn btn-info mt-3">
          add
        </button>
      </div>
      <div className="w-50 col-6">
        <div id="added"></div>
      </div>
    </div>
  );
};

export default AddTask;
