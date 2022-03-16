import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PostsList.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from "@mui/material/TextField";
import { Add } from "@mui/icons-material";
import Api from "../../api/Api";
import Post from "../post/Post";
import { PostsContext } from "../../context/PostsContext";
import { GroupsContext } from "../../context/GroupsContext";
import Dialog from "../dialog/Dialog";

const PostsList = () => {
  const { groupId } = useParams();
  const { posts, addNewPost } = useContext(PostsContext);
  const { user, setUser } = useContext(GroupsContext);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const [isIncorrectData, setIsIncorrectData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getConfig = {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
            "Accept": "application/json"
          }
        };
        const user = await Api.get("/User/user-info", getConfig);
        setUser(user);
      } catch(err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const addNewTask = async () => {
    try {
      const getConfig = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
          "Accept": "application/json"
        }
      };
      const payload = {
        caption: taskTitle,
        description: taskDescription,
        groupId
      }
      await Api.post("/Post", payload, getConfig)
      .then(response => {
        addNewPost(response.data);
        setTaskTitle("");
        setTaskDescription("");
      }).catch(err => {
        setIsIncorrectData(err.response.data.message);
      });
    } catch(err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {isIncorrectData ? <Dialog handleClose={() => setIsIncorrectData(false)}>
        <div className="overlay-pane-title">
          <span>Error</span>
        </div>
        <div className="overlay-pane-message">
          <span>{isIncorrectData}</span>
        </div>
        <div className="overlay-pane-button-wrapper">
          <button onClick={() => setIsIncorrectData(false)} className="overlay-pane-button">Ok</button>
        </div>
      </Dialog> : null }
      <div className="postsListContainer">
        { user.data && user.data.role === "teacher" ? 
          <Accordion sx={{ borderRadius: "4px" }}>
            <AccordionSummary
              sx={{
                minHeight: "80px",
                padding: "0 24px"
              }}
              aria-controls="panel1a-content"
              id="panel1a-header"
            > 
              <div className="add-new-task-header">
                <Add className="add" />
                <span className="add-new-task-text">Add a new task</span>
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: "0 24px 16px"
              }}
            >
              <div className="add-new-task-details">
                <TextField id="title" label="Task Title" variant="standard" fullWidth value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
              </div>
              <div className="add-new-task-details">
                <TextField id="description" label="Task Description" variant="filled" fullWidth  multiline minRows={4} value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
              </div>
              <button className="add-new-task-button" onClick={addNewTask}>
                Add
              </button>
            </AccordionDetails>
          </Accordion> : null }
        { posts.map(post => <Post post={post} />) }
      </div>
    </>
  );
};

export default PostsList;
