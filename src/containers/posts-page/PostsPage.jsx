import React from "react";
import HeaderGroups from "../../components/header-groups/HeaderGroups";
import PostsList from "../../components/posts-list/PostsList";

const PostsPage = () => {
  console.log("PostsPage");
  return (
    <>
      <HeaderGroups displayAdd={false} title={`Project:`}/>
      <PostsList />
    </>
  );
};

export default PostsPage;
