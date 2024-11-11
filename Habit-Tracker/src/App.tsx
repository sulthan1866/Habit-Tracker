import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Home from "./components/home/Home";
import Habit from "./components/Habit/Habit";

const App =()=> {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={<Home />}/>
          <Route path={`/home/:habitID`} element={<Habit/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
