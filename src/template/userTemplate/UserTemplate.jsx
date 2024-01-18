import React, { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './UserTemplate.module.scss';

const UserTemplate = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  

  return (
    <div className={styles.userBg}>
      
      <Outlet />
    </div>
  )
}

export default UserTemplate