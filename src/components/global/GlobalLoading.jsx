import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './GlobalLoading.module.scss';

const GlobalLoading = () => {
    const loading = useSelector(state => state.userSlice.globalLoading);
    if(loading) {
        return (
            <div className='absolute w-full h-full top-0 left-0 z-50 flex justify-center items-center'>
                <div>
                    <div className={styles.spinner}>
                        <div className={clsx(styles.blob, styles.blob-0)}></div>
                    </div>
                </div>
            </div>
        )
    } else {
        return '';
    }
}

export default GlobalLoading