import React from 'react';
import styles from './post_modal.module.css';
import Highlight from 'react-highlight';
import Moment from 'react-moment';
import 'moment/locale/ko';
import CommentList from '../comment_list/comment_list';
import CommentInput from '../comment_input/comment_input';
import Like from '../like/like';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const PostModal = ({ postModal, comments, likes }) => {
  const router = useRouter();

  const commentLength = Object.keys(comments).length;

  const { id } = router.query;

  const onLike = e => {
    fetch(`${process.env.REACT_APP_ALG_SERVER}/like/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then(res => {});
  };

  return (
    <motion.div
      className={styles.post}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeIn', duration: 0.7 }}
    >
      <FontAwesomeIcon
        icon={faXmarkCircle}
        className={styles.cancel}
        onClick={() => router.push('/')}
      />
      <div className={styles.box}>
        <section className={styles.left}>
          <ul className={styles.tags}>
            <li># {postModal?.tag1}</li>
            <li># {postModal?.tag2}</li>
            <li># {postModal?.tag3}</li>
          </ul>
          <div className={styles.codes}>
            <Highlight language={postModal?.tag1}>
              {postModal?.algCode}
            </Highlight>
          </div>
        </section>
        <section className={styles.right}>
          <div className={styles.profile}>
            <div className={styles.profile__img}></div>
            <p className={styles.name}>{postModal?.users.userid}</p>
          </div>
          <div className={styles.postTime}>
            <Moment fromNow>{postModal?.post_date}</Moment>
          </div>
          <div className={styles.text}>
            <p>{postModal?.text}</p>
          </div>
          <div className={styles.comments}>
            <div className={styles.commentsHeader}>
              <p className={styles.commentTitle}>댓글</p>
              <p className={styles.commentNum}>{commentLength}</p>
              <Like onLike={onLike} />
              <p className={styles.likeNum}>{likes?.count}</p>
            </div>
            <div className={styles.commentsBox}>
              <CommentList comments={comments} />
            </div>
            <div className={styles.commentsInput}>
              <CommentInput postid={postModal?.postid} />
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default PostModal;
