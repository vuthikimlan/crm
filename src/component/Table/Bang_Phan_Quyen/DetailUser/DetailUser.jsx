import {  Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { getInforUser } from '../../../../services/lead';

function DetailUser(data) {
  const [dataUser, setDataUser] = useState({})
  const handleGetInfoUser= async (data) =>{
    getInforUser().then((res)=>{
      if(res.success === 'true') {
        setDataUser(res?.data?.data)
      }
      // setData(res?.data)
    })
  }
  useEffect(() =>{
    handleGetInfoUser()
  }, [])
  
  return(
    <>
        <Descriptions layout="vertical"  >     
          
          <Descriptions.Item label="Tên người dùng" > {dataUser?.userName} </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh" span={2}> {dataUser?.date} </Descriptions.Item>
          <Descriptions.Item label="E-mail" span={2}> {dataUser?.email} </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ" span={2}> {dataUser?.address} </Descriptions.Item>
          <Descriptions.Item label="Vai trò" span={2}> {dataUser?.role?.roleName} </Descriptions.Item>
         
{/* 
          <Descriptions.Item label="Tên người dùng"> Vũ Thị Khánh Linh </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh" span={2}> 10/3/1992 </Descriptions.Item>
          <Descriptions.Item label="E-mail" span={2}> linh123@gmail.com  </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ" span={3}> Kinh Môn - Hải Dương</Descriptions.Item>
          <Descriptions.Item label="Vai trò" span={3}>STAFF</Descriptions.Item> */}

        </Descriptions>
    </>
  );
} 
export default DetailUser;