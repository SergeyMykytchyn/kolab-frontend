import React, { useContext, useState } from "react";
import "./Post.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Api from "../../api/Api";
import { PostsContext } from "../../context/PostsContext";
import { GroupsContext } from "../../context/GroupsContext";
import { ResponsiveTable } from "../responsive-table/index";
import Dialog from "../dialog/Dialog";

const Post = ({ post }) => {
  const { updatePost } = useContext(PostsContext);
  const { user } = useContext(GroupsContext);
  const [messageBody, setMessageBody] = useState("");

  const [isIncorrectData, setIsIncorrectData] = useState(false);

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
      await Api.post("/Form", payload, getConfig)
      .then(async response => {
        const updatedPost = await Api.get(`/Post/${post.id}`, getConfig);
        updatePost(updatedPost.data);
        setMessageBody("");
      })
      .catch(err => {
        setIsIncorrectData(err.response.data.message);
      });
    } catch(err) {
      console.error(err.message);
    }
  }

  let rows = [];
  if (post.forms) {
    for (let i = 0; i < post.forms.length; i++) {
      rows.push({ 
        user: post.forms[i].user.firstName + " " + post.forms[i].user.lastName,
        content: post.forms[i].content
      });
    }
  }

  const columns = [
    {
      accessor: "name",
      label: "Name",
      position: 1,
      priorityLevel: 1,
      minWidth: 180,
      isVisible: true
    },
    {
      accessor: "message",
      label: "Message",
      position: 2,
      priorityLevel: 2,
      minWidth: 300,
      isVisible: true
    }
  ];

  const rowsData = rows.map((row, index) => {
    return {
      id: index,
      data: {
        name: row.user,
        message: row.content
      }
    };
  });

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
      <div style={{ marginTop: "20px" }}>
        <Accordion>
          <AccordionSummary
            sx={{
              minHeight: "80px",
              padding: "0 24px"
            }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="post-panel1a-header"
          > 
            <div className="post-header">
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
            { post.forms && post.forms.length > 0 ? 
              <div className="post-discussion">
                <div className="post-discussion-title">
                  <span >Discussion:</span>
                </div>
                <ResponsiveTable columns={columns} rows={rowsData} />
              </div> : null}
            <div className="post-send-message">
              <div className="post-send-message-title">
                <span >Send a message:</span>
              </div>
              <TextField id="messageBody" label="Message Body" variant="filled" fullWidth  multiline minRows={4} value={messageBody} onChange={(e) => setMessageBody(e.target.value)} />
            </div>
            <button className="post-send-button" onClick={handleSend}>Send</button>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default Post;
