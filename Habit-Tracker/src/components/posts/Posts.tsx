import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Menu from "../home/Menu";

interface Post {
  postID: number;
  heading: string;
  imageLink: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { userID } = useParams<{ userID: string }>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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
      const posts = axios.get(`${import.meta.env.VITE_BASE_API_URL_V1}/posts`);
      posts
        .then((resp) => {
          if (resp.status == 200) {
            return resp.data;
          }
        })
        .then((data: Post[]) => {
          setPosts(data);
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
  }, [navigate, userID]);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;
  return (
    <>
      <div className="row">
        <div className="col">
          <Menu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            heading={userID}
            options={["Home"]}
            onClicks={[
              () => {
                navigate(`/${userID}`);
              },
            ]}
          />
        </div>
      </div>

      <div
        className={`flex-grow-1 ms-auto ${menuOpen ? "content-shifted" : ""}`}
        style={{ overflowX: "auto", whiteSpace: "nowrap", padding: "20px" }}
      >
        <div className="col d-flex justify-content-center">
          <h1>Posts</h1>
        </div>
        <div className="container">
          <div className="row">
            {posts.map((post: Post) => (
              <div
                key={post.postID}
                className="card p-2 col-5 col-md-3 m-1 col-lg-2"
              >
                <Link to={post.postID.toString()}>
                  <img
                    className="card-img-top img-fluid"
                    src={post.imageLink}
                    alt={post.heading + " img"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{post.heading}</h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
