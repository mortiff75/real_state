import { Link, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import { apiRequest } from "../../lib/apiRequest";
import "./profile.scss";
import { useContext } from "react";
import { authContext } from "../../../context/auth";
import List from "../../components/list/List";
import useSWR from "swr";
import { DNA } from "react-loader-spinner";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { updateUser, currentUser } = useContext(authContext);

  const { data, error, isLoading } = useSWR("postsAndChats", () =>
    fetchPostsAndChats()
  );

  const fetchPostsAndChats = async () => {
    const postsResponse = apiRequest.post("users/profile-posts");
    const chatsResponse = apiRequest.get("chats");

    const responses = await Promise.all([postsResponse, chatsResponse]);
    return { posts: responses[0].data, chats: responses[1].data };
  };

  const handleLogout = async () => {
    try {
      await apiRequest.post("auth/logout");

      updateUser(null);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to={"/profile/update"}>
              <button>Update Profile</button>
            </Link>
          </div>

          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "/favicon.png"} alt="avatart" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>

            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>

          {/* My List */}

          <div className="title">
            <h1>My List</h1>
            <Link to={"/profile/create"}>
              <button>Create New Post</button>
            </Link>
          </div>

          {isLoading && <DNA />}

          {!isLoading && !error && <List posts={data.posts.userPosts} />}

          {/* Card List */}

          <div className="title">
            <h1>Saved List</h1>
          </div>

          {isLoading && <DNA />}

          {!isLoading && !error && <List posts={data.posts.savedPosts} />}
        </div>
      </div>

      <div className="chatContainer">
        <div className="wrapper">
          {!isLoading && !error && data.chats && <Chat chats={data.chats} />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
