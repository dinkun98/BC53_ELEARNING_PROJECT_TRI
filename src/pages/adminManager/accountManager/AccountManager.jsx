import React, { Fragment, useEffect } from 'react'
import { Table, Input, Button } from 'antd';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchApiAccountAction, } from '../../../redux/action/adminAction/accountManagerAction';
import styles from './Admin.module.scss'
import clsx from 'clsx';
import adminService from '../../../services/adminSevice';
import Swal from 'sweetalert2';
import { FaUserCheck, FaUserClock } from "react-icons/fa";


const AccountManager = (props) => {

  const dispatch = useDispatch();
  const { accountList } = useSelector(state => state.accountManagerSlice);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchApiAccountAction());
  }, [])

  // xóa tài khoản người dùng
  const handleDeleteAccount = async (tk) => {

    Swal.fire({
      title: 'Có Chắc Bạn Muốn Xóa Tài Khoản',
      text: tk,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa Tài Khoản',
      cancelButtonText: 'Hủy Bỏ'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await adminService.getApiDeleteAccount(tk);
          Swal.fire(res.data, '', 'success').then((result) => {
            dispatch(fetchApiAccountAction());
          });
        } catch (err) {
          Swal.fire('', err.response.data, 'error')
        };
      };
    });

  }

  const columns = [
    {
      title: 'Họ Tên',
      dataIndex: 'hoTen',
      key: '1',
      sorter: (a, b) => {
        let tenA = a.hoTen.toLowerCase().trim();
        let tenB = b.hoTen.toLowerCase().trim();
        if (tenA > tenB) {
          return 1
        } else {
          return -1;
        }
      },
      render: (text, user) => {
        return <Fragment>
          <h4 className={clsx(styles.gradientText, 'font-medium text-lg capitalize')}>{user.hoTen}</h4>
        </Fragment>
      },
      sortDirection: ['descend', 'ascend'],
      width: '20%',
    },
    {
      title: 'Tài Khoản',
      key: '2',
      dataIndex: 'taiKhoan',
      width: '20%',
      render: (text, user, index) => {
        return <Fragment>
          <p>{user.taiKhoan}</p>
        </Fragment>
      },

    },
    {
      title: 'Số Điện Thoại',
      key: '3',
      dataIndex: 'soDT',
      width: '10%',
      render: (text, user, index) => {
        return <Fragment>
          <p>{user.soDT}</p>
        </Fragment>
      }
    },
    {
      title: 'Loại Người Dùng',
      key: '4',
      dataIndex: 'tenLoaiNguoiDung',
      width: '10%',
      render: (text, user, index) => {
        return <Fragment>
          <p>{user.tenLoaiNguoiDung}</p>
        </Fragment>
      }
    },
    {
      title: 'Email',
      key: '5',
      dataIndex: 'email',
      width: '20%',
      render: (text, user, index) => {
        return <Fragment>
          <p>{user.email}</p>
        </Fragment>
      }
    },
    {
      title: 'Tác Vụ',
      key: '6',
      dataIndex: 'taiKhoan',
      width: '20%',
      render: (text, user, index) => {
        return <Fragment>
          <div className={styles.action}>
            <NavLink key={1} to={`/admin/account/approved-course/${user.taiKhoan}`} className='text-white mr-2 text-2xl'>
              <span><FaUserCheck style={{ color: 'blue', display: 'inline-block' }} /></span>
            </NavLink>
            <h1>Xem Khóa Học Đã Duyệt</h1>
          </div>

          <div className={styles.action}>
            <NavLink key={1} to={`/admin/account/waiting-approval/${user.taiKhoan}`} className='text-white mr-2 text-2xl'>
              <span><FaUserClock style={{ color: 'green', display: 'inline-block' }} /></span>
            </NavLink>
            <h1>Xem Khóa Học Chờ Duyệt</h1>
          </div>

          <div className={styles.action}>
            <span key={2} className='text-white mx-2 text-2xl cursor-pointer'
              onClick={() => handleDeleteAccount(user.taiKhoan)}><DeleteOutlined style={{ color: 'red' }}></DeleteOutlined></span>
            <h1>Xóa Người Dùng</h1>
          </div>


        </Fragment>
      }
    },



  ];

  const data = accountList?.items;
  const onChangePagination = async (pagination) => {
    dispatch(fetchApiAccountAction(pagination.current));
  };

  const { Search } = Input;

  // tim kiem tai khoan nguoi dung
  const onSearch = (value) => {
    dispatch(fetchApiAccountAction(1, value));
  };

  return (
    <div>
      <div className="flex justify-between mb-5 md:mb-10" >
        <h3 className='text-teal-600 text-xl font-semibold'>Quản lý Tài Khoản</h3>
        <Search
          allowClear
          className='w-1/2'
          placeholder="Nhập từ khóa tìm kiếm"
          onSearch={onSearch}
        />
        <Button className={clsx('flex items-center', styles.btnGradient)} onClick={() => navigate('/admin/account/create')} type='primary' size='large'><UserOutlined /> <span>Thêm Tài Khoản</span></Button>

      </div>
      <Table pagination={{ total: accountList?.totalCount }} rowKey={'taiKhoan'} columns={columns} dataSource={data} onChange={onChangePagination} />
    </div>


  )
}

export default AccountManager