import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NotFound.module.scss';
import styleImg from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={clsx( styleImg.page404Found, styles.page404)}>
            <div className={styles.page404Container}>
                <div className={styles.content404}>
                    <h1>404</h1>
                    <h2>ERROR</h2>
                </div>
                <div className={styles.contentBox404}>
                    <h3>Có gì đó sai ở đây</h3>
                    <button className={styles.btn404}><NavLink to='/' >Quay Về Trang Chủ</NavLink></button>
                </div>
            </div>
        </div>
    )
}

export default NotFound