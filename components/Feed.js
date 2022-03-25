import React, { useState, useEffect } from "react";
import Input from "./Input";
import { useRecoilState } from "recoil";
import { handlePostState, useSSRPostsState } from "../atoms/postAtom";
import Post from "./Post";

let init = true;

const Feed = ({ posts }) => {
  const [realtimePosts, setRealTimePosts] = useState();
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);
  useEffect(() => {
    if (init) {
      init = false;
      return;
    }
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: { "Content-Type": "applicatoin/json" },
      });

      const responseData = await response.json();
      setRealTimePosts(responseData);
      setHandlePost(false);
      setUseSSRPosts(false);
    };

    fetchPosts();
  }, [handlePost]);

  return (
    <div className="spacing-y-6 pb-24 max-w-lg">
      <Input />
      {/* Posts */}
      {!useSSRPosts
        ? realtimePosts.map((post) => <Post key={post._id} post={post} />)
        : posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default Feed;
