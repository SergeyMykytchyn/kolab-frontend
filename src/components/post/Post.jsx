import React, { useState } from "react";
import "./Post.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Api from "../../api/Api";

const Post = ({ post }) => {
  const [messageBody, setMessageBody] = useState("");

  const handleSend = async () => {
    try {
      const payload = {
        postId: post.id,
        content: messageBody
      };
      const getConfig = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
          "Accept": "application/json"
        }
      };
      const response = await Api.post("/Form", payload, getConfig);
      console.log(response);
    } catch(err) {
      console.error(err.message);
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <Accordion>
        <AccordionSummary
          sx={{
            minHeight: "80px",
            padding: "0 24px"
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        > 
          <div className="add-new-task-header">
            <span className="post-header-title">{post.caption}</span>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "0 24px 16px"
          }}
        > 
          <div className="post-body-description">
            <span >{post.description}</span>
          </div>
          <div className="post-send-message">
            <div className="post-send-message-title">
              <span >Send a message:</span>
            </div>
            <TextField label="Message Body" variant="filled" fullWidth  multiline minRows={4} value={messageBody} onChange={(e) => setMessageBody(e.target.value)} />
          </div>
          <button className="post-send-button" onClick={handleSend}>Send</button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Post;
