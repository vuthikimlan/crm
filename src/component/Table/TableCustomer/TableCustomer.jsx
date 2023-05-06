import { Button,  Dropdown,  Space, Table, Tag, Modal, Drawer, Popover } from 'antd';
import {FilterOutlined, MoreOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {  PageContainer } from '@ant-design/pro-components'
import {  useEffect, useState } from 'react';
import '../TableStaff/Table.css'

import {  useNavigate } from 'react-router-dom';
import AddCustomer from './AddCustomer/AddCustomer';
import {CloseOutlined, } from  '@ant-design/icons';
import DetailCustomer from './Detail/DetailCustomer';
import { delAllCustomer, delCustomer, getListCustomer } from '../../../services/lead';
import FilterCustomer from './FilterCustomer';
import ContentPopover from './ContentPopover';
import ButtonGroup from 'antd/es/button/button-group';

// import DetailCustomer from '../../Modal/Detail/DetailCustomer';

function TableContent(props) {
  // const location = useLocation()
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState()
  const [openDrawer, setOpenDrawer] = useState()
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataCustomer, setDataCustomer] = useState([])
  const [isChecked, setIsChecked] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({})
  const { confirm } = Modal;

  // console.log("abc:: ",selectedRowKeys);
  
  // khi select sẽ hiện thị chọn bao nhiêu 
  const hasSelected = selectedRowKeys.length > 0

  const showhowConfirm = () => {
    confirm({
      title: 'Xoá khách hàng ',
      content: 'Việc này sẽ xóa khách hàng được chọn. Bạn có chắc chắn muốn xóa?',
      // onOk() {
      //     handleDeleteAll(selectedRowKeys)
      // },
      onCancel() {
        console.log('Cancel');
      },
    });
  };


  const onClose = () =>{
    setOpenDrawer(false)
  }

  //Hàm lấy thông tin của khách hàng
  const handleGetCustomer = () =>{
    setLoading(true)
    getListCustomer().then((res) =>{
      setDataCustomer(res?.data?.data?.items)

    }).finally(() =>{
      setLoading(false)
    })
  }

  // Hàm xóa từng khách hàng
  // const handleDelete = (id) =>{
  //   delCustomer(id).then((res)=>{
  //     if(res.status === 200) {
  //       handleGetCustomer()
  //     }
  //   })
  // }

  // Hàm xóa tất cả các khách hàng
  // const handleDeleteAll = (selectedRowKeys) =>{
  //   delAllCustomer(selectedRowKeys).then((res)=>{
  //     if(res.status === 200) {
  //       handleGetCustomer()
  //     }
  //   })
  // }
  

  //sử dụng để gửi yêu cầu API khi trang thay đổi
  useEffect(() =>{
    handleGetCustomer()
    setLoading(false)
  },[])



// //  RUD
//   const items = [
//     {
//       key: '1',
//       label:'Thông tin chi tiết',
//       onClick: (id) =>{
//         setOpenDrawer(true)
//         navigate(`/adminpage/customer/detailcustomer/${id}`)
//       }
      

//     },
//     {
//       key: '2',
//       label:'Chỉnh sửa',
//       // **********************************
//       onClick: (id) =>{
//         setCurrentCustomer(id);
//         setOpenModal(true)
//       }
//       // ********************************
      
//     },
//     // /////////////////////////////
//     {
//       key: '3',
//       label:'Xoá',
//       // onClick: (id) =>{
//       //   handleDelete(id.id)

//       // }
//       // //////////////////////////
//     },
  
//   ];

  //cột thông tin của bảng
  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: "customerName",
    },
    
    {
      title: 'Số điện thoại',
      dataIndex: "phone",
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Người quản lý',
      dataIndex:['group', 'user', 'userName']
    },
    {
      title: 'Ngày tạo',
      dataIndex:'createdDate'
    },
    {
      title:'Ngày cập nhật',
      dataIndex:'updateDate'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'statusName',
      render: (text,record) => {
            return (
              <>
                <Tag color={"green"} key={1}>
                    {record?.status?.statusName}
                </Tag>
                <Popover trigger={['click']} placement='bottom' content={<ContentPopover data={currentCustomer}/>}>
          
                  {/* Khi click vào icon moreOutLine thì hiện ra các lựa chọn */}
                  <Button icon={<MoreOutlined/>} className='more_option'
                    onClick={(e) => {e.preventDefault()
                      setCurrentCustomer(record)}}
                  >   
                  </Button>
                </Popover>
              </> )
      }
    },
    {
      title: 'Action',
      key:'action',
      render:(e, record, idx) => (
        <Space>
            <Button>
              <DeleteOutlined />
            </Button>
            <Button>
              <EditOutlined />
            </Button>
            <Button>
              <EditOutlined />
            </Button>
        </Space>
      )

    }
    
    
  ];
  return (
    <div>

      <PageContainer
        title='Tất cả khách hàng'
        extra={[
          <Button
            className='button_add_member'
            onClick={() =>{
              setOpenModal(true)
            }}
          >
            + Thêm Khách Hàng
          </Button> ,
         
          <Popover 
            placement="bottom" 
            content={
              <FilterCustomer/>
            }
            trigger="click"
          >
            <Button  className='filter'> 
              <FilterOutlined /> 
              Lọc
            </Button>
        </Popover>
        ]}
      >
        {/* Thêm Khách hàng */}
        <AddCustomer 
          onSuccess={() =>{
            handleGetCustomer();
            setOpenModal(false)
          }}
          openModal={openModal}
          onOpenChange = {(open) =>{
            if(!open) {
              setOpenModal(false)
              setCurrentCustomer({})
            }
          }}
          data={currentCustomer}
          
          
        />
       {/* Hiển thị thông tin chi tiết của khách hàng */}
        <Drawer
          title="Thông tin chi tiết của khách hàng"
          width={500}
          open={openDrawer}
          onClose={onClose}
          extra={
            <Space>
              <Button onClick={onClose}>Quay lại</Button>
            </Space>
          }
          >
            <DetailCustomer/>
          </Drawer>

        <Table 
          rowSelection={{
             onChange: (e, record) => setSelectedRowKeys(record.map((data) => data.customerName))
          }} 
          columns={columns} 
          dataSource={dataCustomer} 
          size='middle' 
          loading={loading}
          
          />

        <div className='edit' style={{ display: hasSelected ? "block" : "none" }}> 
          {/* style={{ display: isChecked ? "block" : "none" }} */}
           <>đã chọn {selectedRowKeys.length}</>
          <Button 
            className='button_edit'
            onClick={() =>{
              showhowConfirm();

            }}
          >
            <CloseOutlined />
            Xoá
          </Button>
          
        </div> 
        
      </PageContainer>
    </div>
  );
};
export default TableContent;