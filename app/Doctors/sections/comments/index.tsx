import React, { useState, useEffect } from "react";
import { Comment } from "../../components";
import { getAllReviews } from "@/api/reviews/rewiews.api";
import styles from "./comments.module.css";

// API'dan keladigan comment typelar
interface CommentType {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  createdAt: string;
  User: {
    name: string;
    surname: string;
  };
}

// Agar sizda commentlarni olish API funksiyasi bo'lsa
// import { getAllComments } from "@/api/comments.api";

const CommentsList = () => {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    getAllReviews().then((res) => {
      console.log("API dan kelgan:", res);
      setComments(res.data);
    });
  }, []);

  console.log(comments);
  return (
    <div className={styles.container}>
      {comments.map((c) => (
        <Comment
          key={c.id}
          fullName={`${c.User.name} ${c.User.surname}`}
          rate={c.rating}
          date={new Date(c.createdAt).toLocaleDateString("uz-UZ")}
        >
          {c.comment}
        </Comment>
      ))}
    </div>
  );
};

export default CommentsList;
