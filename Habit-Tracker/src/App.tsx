import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Home from "./components/home/Home";
import Habit from "./components/Habit/Habit";
import ChangePassword from "./components/login/ChangePassword";
import Profile from "./components/profile/Profile";
import EmailChanged from "./components/profile/EmailChanged";
// import Test from "./components/AI/Test";
import Posts from "./components/posts/Posts";
import Post from "./components/posts/Post";
import AdminPage from "./components/admin/AdminPage";
import AddPost from "./components/admin/AddPost";
import EditPost from "./components/admin/EditPost";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/this/is/admin/page/path" element={<AdminPage />} />
          <Route path="/this/is/admin/page/path/add" element={<AddPost />} />
          <Route path="/this/is/admin/page/path/edit" element={<EditPost />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ChangePassword />} />
          <Route path="/:userID/reset-email" element={<EmailChanged />} />
          <Route path="/:userID" element={<Home />} />
          <Route path="/:userID/posts" element={<Posts />} />
          <Route path="/:userID/posts/:postID" element={<Post />} />
          <Route path="/:userID/profile" element={<Profile />} />
          <Route path={`/:userID/:habitID`} element={<Habit />} />
          {/* <Route path={`/:userID/ai`} element={<Test />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
