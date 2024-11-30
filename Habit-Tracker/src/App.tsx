import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Home from "./components/home/Home";
import Habit from "./components/Habit/Habit";
import ChangePassword from "./components/login/ChangePassword";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ChangePassword />} />
          <Route path="/:userID" element={<Home />} />
          <Route path={`/:userID/:habitID`} element={<Habit />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
