import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

const Posts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 text-[#333333]">
      <h1 className="text-4xl font-bold mb-8 font-(family-name:--font-geist-sans)">Posts</h1>
      <ul className="font-(family-name:--font-geist-sans) max-w-2xl space-y-4 flex flex-col">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <span className="font-semibold">{post.title}</span>
            <span className="text-sm text-gray-600 ml-2">by {post.author.name}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
