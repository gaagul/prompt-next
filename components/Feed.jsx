"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

function PromptCardList({ data, handleTagClick }) {
  return (
    <div className="mt-6 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
}

function Feed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchTermChnage = (e) => {
    setSearchTerm(e.target.value);
  };
  console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/prompt`);
      console.log("res", res);
      const data = await res.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full text-center">
        <input
          type="text"
          placeholder="Search for tag or username"
          value={searchTerm}
          required
          className="search_input peer"
          onChange={handleSearchTermChnage}
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}

export default Feed;
