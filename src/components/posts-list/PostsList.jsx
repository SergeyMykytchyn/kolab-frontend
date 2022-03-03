import React from "react";
import "./PostsList.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Add } from "@mui/icons-material";

const PostsList = () => {
  return (
    <div className="postsListContainer">
      <Accordion>
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
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PostsList;
