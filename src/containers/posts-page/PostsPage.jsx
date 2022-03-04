import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderGroups from "../../components/header-groups/HeaderGroups";
import PostsList from "../../components/posts-list/PostsList";
import Api from "../../api/Api";

const PostsPage = () => {
  const { groupId } = useParams();
  const [posts, setPosts] = useState([]);
  const [group, setGroup] = useState({});

  const addNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getConfig = {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
            "Accept": "application/json"
          }
        };
        let response = await Api.get(`/Post/?groupId=${groupId}`, getConfig);
        setPosts(response.data);
        response = await Api.get(`/Group/${groupId}`, getConfig);
        setGroup(response.data);
      } catch(err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <HeaderGroups displayAdd={false} title={`Project: ${group.name}`}/>
      <PostsList posts={posts} addNewPost={addNewPost} />
    </>
  );
};

export default PostsPage;
