import React from 'react';
import CommentItem from '../comment_item/comment_item';
import styles from './comment_list.module.css';

const CommentList = ({ comments }) => {
  return (
    <ul className={styles.box}>
      {comments.map(comment => (
        <CommentItem
          key={comment.commentid}
          commentId={comment.commentid}
          comment={comment}
        />
      ))}
    </ul>
  );
};

export default CommentList;
