import {  Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { getInforCustomer } from '../../../../services/lead';


function DetailCustomer(data) {
  const [dataCustomer, setDataCustomer] = useState({})
  const handleGetInfoCustom = async (data) =>{
    getInforCustomer().then((res)=>{
      if(res.success === 'true') {
        setDataCustomer(res?.data?.data)
      }
      // setData(res?.data)
    })
  }
  useEffect(() =>{
    handleGetInfoCustom()
  }, [])
  return(
    <>Z
        <Descriptions layout="vertical"  >     
          <Descriptions.Item label="Id">{dataCustomer?.customerId}</Descriptions.Item>
          <Descriptions.Item label="Name"> {dataCustomer?.customerName} </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo"> {dataCustomer?.createdDate} </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật"> {dataCustomer?.updateDate} </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại"> {dataCustomer?.phone} </Descriptions.Item>
          <Descriptions.Item label="E-mail"> {dataCustomer?.email} </Descriptions.Item>
          <Descriptions.Item label="Ghi Chú"> {dataCustomer?.note} </Descriptions.Item>
          <Descriptions.Item label="Trạng thái"> {dataCustomer?.status?.statusName} </Descriptions.Item>
          <Descriptions.Item label="Tên nhóm khách hàng"> {dataCustomer?.group?.groupName} </Descriptions.Item>
          <Descriptions.Item label="Người quản lý"> {dataCustomer?.group?.user?.userName} </Descriptions.Item>
        </Descriptions>
    </>
  );
} 
export default DetailCustomer;