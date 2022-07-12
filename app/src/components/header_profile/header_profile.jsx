import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './header_profile.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const HeaderProfile = props => {
  const router = useRouter();
  const [isProfile, setIsProfile] = useState(false);
  const dispatch = useDispatch();

  const isLogin = useSelector(state => state.loginReducer.isLogin);
  const clickProfile = () => {
    setIsProfile(!isProfile);
  };

  const goPage = e => {
    if (e.target.innerText === 'logout') router.push('/');
    else router.push(`/${e.target.innerText}`);
    setIsProfile(!isProfile);
  };

  const onClickLogoutBtn = () => {
    localStorage.clear();
    dispatch({ type: 'LOGOUT' });
    router.push('/');
    setIsProfile(!isProfile);
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null) {
      dispatch({ type: 'LOGIN' });
    }
  });

  return (
    <div className={styles.box}>
      <div
        onClick={clickProfile}
        className={isLogin ? `${styles.userImg}` : `${styles.basicImg}`}
      ></div>
      <div className={isProfile ? `${styles.btnBox}` : `${styles.noneBox}`}>
        {!isLogin && (
          <button className={styles.btn} onClick={goPage}>
            login
          </button>
        )}
        {!isLogin && (
          <button className={styles.btn} onClick={goPage}>
            signup
          </button>
        )}
        {isLogin && (
          <button className={styles.btn} onClick={goPage}>
            mypage
          </button>
        )}
        {isLogin && (
          <button className={styles.btn} onClick={onClickLogoutBtn}>
            logout
          </button>
        )}
      </div>
    </div>
  );
};

export default HeaderProfile;
