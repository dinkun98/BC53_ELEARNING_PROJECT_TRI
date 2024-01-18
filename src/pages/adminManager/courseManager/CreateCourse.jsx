
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { maNhom } from '../../../utils/index';
import { Form, Radio, Input, DatePicker, InputNumber, Select } from 'antd';
import moment from 'moment';
import Swal from 'sweetalert2';
import coursesService from '../../../services/courseService';
import TextArea from 'antd/es/input/TextArea';

const CreateCourse = (props) => {

    const profile = useSelector(state => state.userSlice.profile);

    const category = useSelector(state => state.courseList.categoryList);


    const [imgSrc, setImgSrc] = useState(null);

    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            maKhoaHoc: '',
            tenKhoaHoc: '',
            moTa: '',
            luotXem: 0,
            danhGia: 0,
            hinhAnh: {},
            maNhom: maNhom,
            ngayTao: '',
            taiKhoanNguoiTao: profile.taiKhoan,
            maDanhMucKhoaHoc: '',

        },
        validationSchema: Yup.object({
            maKhoaHoc: Yup.string().required('* Vui lòng nhập mã khoá học !'),
            tenKhoaHoc: Yup.string().required('* Vui lòng nhập tên khoá học !'),
            moTa: Yup.string().required('* Vui lòng nhập mô tả !'),
            luotXem: Yup.string().required('* Vui lòng nhập mô tả !'),
            danhGia: Yup.string().required('* Vui lòng nhập mô tả !'),
            hinhAnh: Yup.string().required('* Vui lòng tải lên hình ảnh khoá học !'),
            ngayTao: Yup.string().required('* Vui lòng chọn ngày tạo khoá học !'),
            maDanhMucKhoaHoc: Yup.string().required('* Vui lòng nhập danh mục khoá học !'),
            maNhom: Yup.string().required('* Vui lòng nhập mã nhóm !'),
        }),
        onSubmit: async (values) => {
            let formData = new FormData();
            for (let key in values) {

                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);

                }
            };
            try {

                const res = await coursesService.fetApiCreateCourse(formData);
                // console.log(res)
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tạo Khóa Học Thành Công',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/admin');
            } catch (err) {
                await Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: err.response.data === 'Upload file không thành công!' ? `${err.response.data} , kiểm tra lại tên khóa học hoặc hình ảnh` : err.response.data,
                    showConfirmButton: false,
                    timer: 2500
                });

            }
        }
    });

    // thay đổi kích thước form
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };


    // thay đổi ngày và set giá trị formik
    const handleChangeDatePicker = (value) => {
        let ngayTao = moment(value?.$d).format('DD/MM/YYYY');
        formik.setFieldValue('ngayTao', ngayTao);
    };

    // thêm hình ảnh
    const handleChangeFile = async (e) => {
        let file = e.target.files[0];
        // luu vao formik
        await formik.setFieldValue('hinhAnh', file);
        if (file.type === 'image/png' || 'image/jpg' || 'image/jpeg' || 'image/gif') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result);
            };

        };
    };

    //hàm lấy giá trị input number
    const handleChangeInputNumber = (name) => {
        return (value) => { formik.setFieldValue(name, value) };
    };

    // chọn danh mục khóa học
    const handleChangeCategory = (value) => {
        formik.setFieldValue('maDanhMucKhoaHoc', value);
    };



    return (
        <>
            <Form onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <h3 className='text-teal-600 text-xl font-semibold mb-9'>Thêm Khóa Học</h3>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Mã khoá Học">
                    <Input name='maKhoaHoc' onChange={formik.handleChange} placeholder='nhập mã khoá học' />
                    {formik.errors.maKhoaHoc && formik.touched.maKhoaHoc && (<p className='text-red-700 mt-1'>{formik.errors.maKhoaHoc}</p>)}
                </Form.Item>
                <Form.Item label="Tên Khoá">
                    <Input name='tenKhoaHoc' onChange={formik.handleChange} placeholder='nhập tên khoá học' />
                    {formik.errors.tenKhoaHoc && formik.touched.tenKhoaHoc && (<p className='text-red-700 mt-1'>{formik.errors.tenKhoaHoc}</p>)}

                </Form.Item>
                <Form.Item label="Mô Tả">
                    <TextArea name='moTa' onChange={formik.handleChange} placeholder='nhập mô tả' />
                    {formik.errors.moTa && formik.touched.moTa && (<p className='text-red-700 mt-1'>{formik.errors.moTa}</p>)}

                </Form.Item>

                <Form.Item label="Hình Ảnh">
                    <input type='file' onChange={handleChangeFile} accept="image/png, image/jpg, image/jpeg, image/gif" />

                    {imgSrc && <img className='mt-5' src={imgSrc} alt="..." style={{ width: '200px' }} />}


                </Form.Item>

                <Form.Item label="Ngày Tạo Khoá Học">
                    <DatePicker format="DD/MM/YYYY" onChange={handleChangeDatePicker} placeholder='DD/MM/YYYY' />
                    {formik.errors.ngayTao && formik.touched.ngayTao && (<p className='text-red-700 mt-1'>{formik.errors.ngayTao}</p>)}

                </Form.Item>

                <Form.Item label="Lượt Xem">
                    <InputNumber name='luotXem' onChange={handleChangeInputNumber('luotXem')} placeholder='nhập danh lượt xem' min={0} />
                    {formik.errors.luotXem && formik.touched.luotXem && (<p className='text-red-700 mt-1'>{formik.errors.luotXem}</p>)}

                </Form.Item>

                <Form.Item label="Đánh Giá">
                    <InputNumber name='danhGia' onChange={handleChangeInputNumber('danhGia')} placeholder='nhập danh mục đánh giá' min={0} max={10} />
                    {formik.errors.danhGia && formik.touched.danhGia && (<p className='text-red-700 mt-1'>{formik.errors.danhGia}</p>)}

                </Form.Item>

                <Form.Item label="Danh Mục Khoá Học">
                    <Select
                        showSearch
                        style={{
                            width: 200,
                        }}
                        placeholder="Chọn danh mục khóa học"
                        onChange={handleChangeCategory}
                        options={
                            category?.map(ele => ({ value: ele.maDanhMuc, label: ele.tenDanhMuc }))
                        }
                    />
                    {formik.errors.maDanhMuc && formik.touched.maDanhMuc && (<p className='text-red-700 mt-1'>{formik.errors.maDanhMuc}</p>)}

                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <button className='px-5 py-2 bg-orange-500 border-transparent text-white cursor-pointer rounded-md' type='submit'>Thêm Khoá Học</button>
                </Form.Item>

            </Form>
        </>
    )

}

export default CreateCourse