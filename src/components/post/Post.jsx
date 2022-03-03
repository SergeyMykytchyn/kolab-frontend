import React from "react";
import "./Post.css";

const Post = ({ post }) => {
  return (
    <div>{post.caption}</div>
  );
};

export default Post;
