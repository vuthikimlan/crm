import { Button, Table,  } from 'antd';
import {FileTextOutlined,  } from '@ant-design/icons'
import {  PageContainer } from '@ant-design/pro-components'
import { useEffect,useState } from 'react';
import '../TableStaff/Table.css'
import { useLocation, useNavigate } from 'react-router-dom';
import CreateRole from '../../Modal/CreateRole/CreateRole';
// import DetailCustomer from '../../Modal/Detail/DetailCustomer';
import {  getAllRole } from '../../../services/lead';


  
function TableContent(props) {
  // const location = useLocation()
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState()
  const [dataRole, setDataRole] = useState([])
  const [loading, setLoading] = useState(true);

 
  const handleGetRole = () =>{
    getAllRole().then((res) =>{
      setLoading(true)
      setDataRole(res?.data?.data?.items)
    }).finally(() =>{
      setLoading(false)
    })
  }
   //sử dụng để gửi yêu cầu API khi trang thay đổi
   useEffect(() =>{
    handleGetRole()
    setLoading(false)
  },[])

  //cột thông tin của bảng
  const columns = [
    
    {
      title: 'Tên vai trò',
      dataIndex: 'roleName',
    },
    // {
    //   title: 'Tên quyền',
    //   dataIndex: 'roleName',
    // },
    
    {
      title: ' Ngày tạo',
      dataIndex: 'createdDate',
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updateDate',
      
    },
  ];
  return (
    <div>

      <PageContainer
        title='Danh sách vai trò'
        // className='Pagecontainer'
        extra={[
          <Button
            className='button_add_member'
            onClick={() =>{
              setOpenModal(true)
            }}
          >
            + Tạo Vai trò
          </Button> ,
          <Button 
            onClick={()=>{
              navigate('/adminpage/listuser')
            }}
          >
            <FileTextOutlined />
            Xem người dùng
          </Button>
        ]
        }
      >
        
        <CreateRole
          openModal={openModal}
          onOpenChange = {(open) =>{
            if(!open) {
              setOpenModal(false)
            }
          }}
        />
        
        <Table  columns={columns} 
               dataSource={dataRole}
              loading={loading}
                />
        {/* dataSource={data} */}
        
      </PageContainer>
    </div>
  );
};
export default TableContent;