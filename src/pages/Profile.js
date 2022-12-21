import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);

  const navigate = useNavigate();

  const { authState } = useContext(AuthContext);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });
    axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username: {username} </h1>
        {authState.username === username && (
          <button onClick={() => navigate("/changepassword")}>
            {" "}
            Change My Password
          </button>
        )}
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, index) => {
          return (
            <div
              className="post"
              key={index}
              onClick={() => navigate(`/post/${value.id}`)}
            >
              <div className="title">{value.title}</div>
              <div className="body">{value.postText}</div>
              <div className="footer">
                <div className="username">{value.userName}</div>
                <div className="buttons">
                  <ThumbUpAltIcon />
                  <label>{value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
