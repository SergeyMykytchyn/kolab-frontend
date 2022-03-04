import React, { useState, createContext } from "react";

export const PostsContext = createContext();

export const PostsContextProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const addNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const updatePost = (post) => {
    setPosts(posts.map(item => {
      if (item.id === post.id) {
        return post;
      }
      return item;
    }));
  };

  return (
    <PostsContext.Provider value={{ posts, setPosts, addNewPost, updatePost }}>
      { props.children }
    </PostsContext.Provider>
  );
};
