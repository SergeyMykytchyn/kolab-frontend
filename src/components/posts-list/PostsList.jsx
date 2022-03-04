import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./PostsList.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from "@mui/material/TextField";
import { Add } from "@mui/icons-material";
import Api from "../../api/Api";
import Post from "../post/Post";

const PostsList = ({ posts, addNewPost }) => {
  const { groupId } = useParams();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

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
      const response = await Api.post("/Post", payload, getConfig);
      addNewPost(response.data);
    } catch(err) {
      console.error(err.message);
    }
  };

  return (
    <div className="postsListContainer">
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
            <TextField label="Task Title" variant="standard" fullWidth value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
          </div>
          <div className="add-new-task-details">
            <TextField label="Task Description" variant="filled" fullWidth  multiline minRows={4} value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
          </div>
          <button className="add-new-task-button" onClick={addNewTask}>
            Add
          </button>
        </AccordionDetails>
      </Accordion>
      { posts.map(post => <Post post={post} />)}
    </div>
  );
};

export default PostsList;
