import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { authContext } from "../../../context/auth";
import { apiRequest } from "../../lib/apiRequest.js";

import { useNavigate } from "react-router-dom";

import UploadImage from "../../components/upload/upload.jsx";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(authContext);

  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(data);

    try {
      setLoading(true);

      const res = await apiRequest.put(`users/${currentUser.id}`, {
        email,
        username,
        password,
        avatar: currentUser.avatar,
      });

      updateUser(res.data);

      navigate("/profile");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          {error && <span>{error}</span>}
          <button disabled={isLoading}>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={currentUser.avatar || "/favicon.png"}
          alt=""
          className="avatar"
        />

        <UploadImage
          uwConfig={{
            cloudName: "dv3htaa02",
            uploadPreset: "morteza",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={(result) => {
            console.log(result.info);
            updateUser({ ...currentUser, avatar: result.info.url });
          }}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
