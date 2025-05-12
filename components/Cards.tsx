"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CardProps = {
  imageUrl: string;
  description: string;
  likes: number;
  comments: number;
};

const Cards = ({ imageUrl, description, likes, comments }: CardProps) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [commentCount, setCommentCount] = useState(comments);
  const [commentInput, setCommentInput] = useState("");

  const handleLike = () => setLikeCount((prev) => prev + 1);

  const handleComment = () => {
    if (commentInput.trim()) {
      setCommentCount((prev) => prev + 1);
      setCommentInput("");
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Image
        src={imageUrl}
        alt="Card Image"
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-3">
        <p className="text-gray-700 text-sm mb-4">{description}</p>

        <div className="flex justify-between text-gray-600 text-sm">
          <Button variant="ghost" size="sm" onClick={handleLike}>
            ❤️ {likeCount}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleComment}>
            💬 {commentCount}
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Write a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <Button size="sm" onClick={handleComment}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
