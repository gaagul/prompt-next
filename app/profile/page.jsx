"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [ posts, setPosts ] = useState([]);

  const handleEdit = (post) => router.push(`/update-prompt?id=${post._id}`);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if(hasConfirmed) {
      try {
        const res = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        if(res.ok) {
          const res = await fetch(`/api/users/${session.user.id}/posts`);
          const data = await res.json();
          setPosts(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    console.log(session?.user.id);

    if(session?.user?.id) fetchPosts();
  }, [session?.user.id]);

  return (
    <Profile
      name={session?.user?.name || "User"}
      desc="Welcome to your personalized profile page."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
