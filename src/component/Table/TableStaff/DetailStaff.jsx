import {  Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { getInforUser } from '../../../services/lead';

function DetailStaff(data) {
  const [dataStaff, setDataStaff] = useState({})

  const handleGetInfoStaff = async (data) =>{
    getInforUser().then((res)=>{
      if(res.success === 'true') {
        setDataStaff(res?.data?.data)
      }
      // setData(res?.data)
    })
  }
  useEffect(() =>{
    handleGetInfoStaff()
  }, [])
  
  return(
    <>
        <Descriptions layout="vertical"  >     
          <Descriptions.Item label="Id">{dataStaff?.userId}</Descriptions.Item>
          <Descriptions.Item label="Tên nhân viên"> {dataStaff?.userName} </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh"> {dataStaff?.date} </Descriptions.Item>
          <Descriptions.Item label="E-mail"> {dataStaff?.email} </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ"> {dataStaff?.address} </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo"> {dataStaff?.createdDate} </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật"> {dataStaff?.updateDate} </Descriptions.Item>
        </Descriptions>
    </>
  );
} 
export default DetailStaff;