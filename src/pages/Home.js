import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { AuthContext } from "../helpers/AuthContext";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const navigate = useNavigate();

  const { authState } = useContext(AuthContext);

  const likeAPost = (e, PostId) => {
    e.stopPropagation();
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: PostId },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === PostId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
        setLikedPosts(
          likedPosts.includes(PostId)
            ? likedPosts.filter((id) => id !== PostId)
            : [...likedPosts, PostId]
        );
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(response.data.likedPosts.map((like) => like.PostId));
        });
    }
  }, [authState.status]);

  return (
    <div>
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
              <div className="username">
                <Link
                  onClick={(e) => e.stopPropagation()}
                  to={`/profile/${value.UserId}`}
                >
                  {value.userName}
                </Link>
              </div>
              <div className="buttons">
                <ThumbUpAltIcon
                  onClick={(e) => likeAPost(e, value.id)}
                  className={
                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }
                />
                <label>{value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
