import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from '../../styles/post.module.css';
import PostModal from '../../components/post_modal/post_modal';
import Modal from '../../service/modal';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const Post = () => {
  const router = useRouter();
  const [post, setPost] = useState<{
    postid: number;
    users: { userid: string; nickname: string };
    algCode: string;
    text: string;
    tag1: string;
    tag2: string;
    tag3: string;
    post_date: Date;
  }>();
  const [comments, setComments] = useState<any[]>([]);
  const [likes, setLikes] = useState<{
    count: number;
    status: Boolean;
  }>();

  const { id } = router.query;

  const item = async () => {
    const { data } = await axios.get(
      `http://ec2-3-37-61-166.ap-northeast-2.compute.amazonaws.com:8080/post/${id}`
    );
    setPost(data);
  };

  const comment = async () => {
    const { data } = await axios.get(
      `http://ec2-3-37-61-166.ap-northeast-2.compute.amazonaws.com:8080/comment/${id}`
    );
    setComments(data);
  };

  const like = async () => {
    const { data } = await axios.get(
      `http://ec2-3-37-61-166.ap-northeast-2.compute.amazonaws.com:8080/like/${id}`
    );
    setLikes(data);
  };

  // const postNum = useSelector(state => state.paramsReducer.postNum);
  // const modal = new Modal(process.env.REACT_APP_ALG_SERVER, postNum);

  // const [postModal, setPostModal] = useState([]);
  // const [comments, setComments] = useState([]);
  // const [likes, setLikes] = useState([]);

  // useEffect(() => {
  //   modal.showPost().then(postModal => setPostModal(postModal));
  //   modal.showComment().then(comments => setComments(comments));
  //   modal.showLikes().then(likes => setLikes(likes));
  // }, []);
  useEffect(() => {
    item();
    comment();
    like();
  }, [item, comment, like]);

  return (
    <div className={styles.box}>
      <PostModal postModal={post} comments={comments} likes={likes} />
    </div>
  );
};

export default Post;
