import React from "react";
import styles from "./Comment.module.css";
import Typography from "../Typography";

interface CommentProps {
  children: React.ReactNode;
  fullName: string;
  date: string;
  rate: number;
}

const Comment: React.FC<CommentProps> = ({
  children,
  fullName,
  date,
  rate,
}) => {
  const normalizedRate = Math.max(0, Math.min(5, Math.round(rate)));

  return (
    <div className={styles.commentContainer}>
      <div className={styles.topStyle}>
        <button className={styles.clientPhoto}>{fullName[0]}</button>
        <div className={styles.topWrapper}>
          <Typography size="14" top="0" bottom="5">
            {fullName}
          </Typography>
          <Typography size="12" top="0" bottom="0" color="#A8BBA3">
            {date}
          </Typography>
        </div>
      </div>
      <div className={styles.bottomStyle}>
        <div className={styles.starRating}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={
                index < normalizedRate ? styles.yellowStar : styles.greyStar
              }
            >
              ★
            </span>
          ))}
        </div>
        <Typography>{children}</Typography>
      </div>
    </div>
  );
};

export default Comment;
