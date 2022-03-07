import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import HeaderGroups from "../../components/header-groups/HeaderGroups";
import PostsList from "../../components/posts-list/PostsList";
import Api from "../../api/Api";
import { PostsContext } from "../../context/PostsContext";
import { GroupsContext } from "../../context/GroupsContext";

const PostsPage = () => {
  const { groupId } = useParams();
  const { setPosts } = useContext(PostsContext);
  const { setUser } = useContext(GroupsContext);
  const [group, setGroup] = useState({});

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
        setPosts(response.data.sort((a, b) => b.id - a.id));
        response = await Api.get(`/Group/${groupId}`, getConfig);
        setGroup(response.data);
        const user = await Api.get("/User/user-info", getConfig);
        setUser(user);
      } catch(err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <HeaderGroups displayAdd={false} title={`Project: ${group.name}`}/>
      <PostsList />
    </>
  );
};

export default PostsPage;
