import React from "react";
import { Checkbox, Rate } from "antd";
import { useSelector } from "react-redux";
import styles from "./SearchFilter.module.scss";

const SearchFilter = () => {
  const { categoryList } = useSelector((state) => state.courseList);

  const onChange = (e) => {
    // console.log(`checked  = ${e.target.value}`);
  };
  return (
    <div className="border border-solid border-gray-400">
      <h1 className="text-lg font-semibold text-center py-2 border-b border-solid border-gray-400">
        Lọc
      </h1>
      <div className={styles.filter}>
        <div className="border-b border-solid border-gray-400">
          <p className="py-2 font-bold text-xl">Khóa Học</p>
          {categoryList.map((ele, index) => (
            <div key={index} className="py-1 sm:py-2">
              <Checkbox className="border-teal-500" onChange={onChange}>
                {ele.tenDanhMuc}
              </Checkbox>
            </div>
          ))}
        </div>
        <div className="border-b border-solid border-gray-400">
          <p className="py-2 font-bold text-xl">Cấp Độ</p>
          <div className=" py-1 sm:py-2">
            <Checkbox>Tất Cả</Checkbox>
          </div>
          <div className="py-1 sm:py-2">
            <Checkbox>Mới Bắt Đầu</Checkbox>
          </div>
          <div className="py-1 sm:py-2">
            <Checkbox>Trung Cấp</Checkbox>
          </div>
          <div className="py-1 sm:py-2">
            <Checkbox>Nâng Cao</Checkbox>
          </div>
        </div>
        <div className={styles.rate}>
          <p className="py-2 font-bold text-xl">Cấp Độ</p>
          <div className="py-1 sm:py-2">
            <Checkbox>
              <Rate
                className="font-lg text-yellow-500"
                disabled
                defaultValue={1}
              />
            </Checkbox>
          </div>
          <div className="py-1 sm:py-2">
            <Checkbox>
              <Rate
                className="font-lg text-yellow-500"
                disabled
                defaultValue={2}
              />
            </Checkbox>
          </div>
          <div className="py-1 sm:py-2">
            <Checkbox>
              <Rate
                className="font-lg text-yellow-500"
                disabled
                defaultValue={3}
              />
            </Checkbox>
          </div>
          <div className="py-1 sm:py-2">
            <Checkbox>
              <Rate
                className="font-lg text-yellow-500"
                disabled
                defaultValue={4}
              />
            </Checkbox>
          </div>
          <div className="py-1 sm:py-2">
            <Checkbox>
              <Rate
                className="font-lg text-yellow-500"
                disabled
                defaultValue={5}
              />
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
