import React, { useState } from 'react';
import styles from './Header.module.scss';
import { HiMenu } from "react-icons/hi";
import { NavLink, useNavigate } from 'react-router-dom';
import { ExportOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { createAction } from '../../redux/action/createAction';
import userType from '../../redux/type/userType';
import { useFormik } from 'formik';
import { defaultTabActiveKeyAction } from '../../redux/action/userAction';
import Swal from 'sweetalert2';


const Header = () => {

  const categoryList = useSelector(state => state.courseList.categoryList);
  const { profile } = useSelector(state => state.userSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [styleCSS, setStyleCSS] = useState(false);

  const formik = useFormik({
    initialValues: {
      keyWord: '',
    },
    onSubmit: (e) => {
      navigate(`search/${e.keyWord}`);
    }
  })

  const handleShowNav = () => {
    setStyleCSS(current => !current);
  }

  // dang xuat
  const handleLogout = () => {
    Swal.fire({
      title: 'Bạn có muốn đăng xuất',
      icon: 'question',
      confirmButtonText: 'Đăng Xuất',
      showCancelButton: true,
      cancelButtonText: 'Hủy Bỏ',
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(createAction(userType.GET_PROFILE, null));
        localStorage.removeItem('Token');
        navigate('/');
        Swal.fire('Đăng Xuất Thành Công !', '', 'success');
      }

    })

  }


  return (
    <div className='fixed w-full z-50 top-0 left-0'>
      <div className={styles.headerLine}></div>
      <div className={styles.header}>
        <div className="container mx-auto flex justify-between items-center ">
          <NavLink to='/' className={styles.Logo} >
            <img src={require('../../assets/logo/logo-tree.png')} alt="logo E-learning" />
            <h2 className='font-bold text-lg'>E-LEARNING</h2>
          </NavLink>

          {/* <nav id='openNav' className={clsx(styles.navMenu, 'md:translate-x-0',
            styleCSS ? 'translate-x-0' : 'translate-x-96',
          )}>
            <div className="w-full md:w-40 xl:w-80 mr-3 py-3 px-1 md:p-0">
              <form
                onSubmit={formik.handleSubmit}
                className="input-group relative flex  w-full">
                <input name='keyWord' onChange={formik.handleChange} type="text" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-teal-600 focus:outline-none placeholder:text-sm" placeholder="Tìm Kiếm Khóa Học" aria-label="Search" aria-describedby="button-addon2" />
                <button className="btn p-2 py-2.5 bg-pink-600 text-white font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-teal-800 hover:shadow-lg focus:bg-green-teal  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-900 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="submit" id="button-addon2">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                  </svg>
                </button>
              </form>
            </div>

            <ul className={styles.navBar}>
              <li className={styles.portfolioMenu}><HiMenu className='mr-1 text-xl' /> DANH MỤC
                <ul className={styles.portfolio}>
                  {categoryList.map(item => {
                    return <li className={styles.category} key={item.maDanhMuc}>
                      <NavLink to={`category-courses/${item.maDanhMuc}`} >{item.tenDanhMuc}</NavLink>
                    </li>
                  })}

                </ul>
              </li>
              <li>
                <NavLink to='courses'>KHÓA HỌC</NavLink>
              </li>
              <li>
                <NavLink to='blog'>BLOG</NavLink>
              </li>
              <li className={styles.eventMenu}>
                <NavLink to='event'>
                  SỰ KIỆN
                </NavLink>
                <ul className={styles.event}>
                  <li className={styles.categoryEvent}>
                    <NavLink to='last-year'>Sự Kiện Sale Cuối Năm</NavLink>
                  </li>
                  <li className={styles.categoryEvent}>
                    <NavLink to='noel'>Sự Kiện Giáng Sinh</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to='about'>THÔNG TIN</NavLink>
              </li>
            </ul>
          </nav> */}

          <div className='flex justify-around'>

            {!profile && <NavLink to='/user/login'><button className={styles.loginButton}>Đăng Nhập</button></NavLink>}

            {profile && <div className={styles.profile}>
              <div className={styles.account}>
                <img src={require('../../assets/avatar/avtUser.jpg')} alt="avatar" />
              </div>
              <ul className={styles.adminBtn}>
                {/* <li>
                  <NavLink onClick={() => { dispatch(defaultTabActiveKeyAction('1')) }} to='profile' >
                    Thông Tin Tài Khoản
                  </NavLink>
                </li> */}
                <li>
                  <NavLink to='admin' >
                    Quản Lý Khóa Học
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className='flex items-center'><ExportOutlined className='text-2xl mr-1' /> <span className='mt-1'>Đăng Xuất</span></button>
                </li>
              </ul>

            </div>}


            <button onClick={handleShowNav} className={styles.buttonNavBar}><HiMenu className='text-2xl' /></button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Header