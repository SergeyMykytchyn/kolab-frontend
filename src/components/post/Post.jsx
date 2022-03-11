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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Post = ({ post }) => {
  const { updatePost } = useContext(PostsContext);
  const { user } = useContext(GroupsContext);
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
      let response;
      // if (post.forms && post.forms.find(item => item.user.id === user.data.id)) {
      //   response = await Api.put("/Form", {...payload, id: post.forms.find(item => item.user.id === user.data.id).id }, getConfig);
      // } else {
      //   response = await Api.post("/Form", payload, getConfig);
      // }
      response = await Api.post("/Form", payload, getConfig);
      const updatedPost = await Api.get(`/Post/${post.id}`, getConfig);
      updatePost(updatedPost.data);
      setMessageBody("");
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
          <div>
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
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Message</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.user}
                        </TableCell>
                        <TableCell>{row.content}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div> : null}
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
