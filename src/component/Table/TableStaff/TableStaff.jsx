import { CloseOutlined, FilterOutlined, MoreOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Drawer, Modal, Popover, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getListUser } from '../../../services/lead';
import AddStaff from './AddStaff';
import './Table.css';

import DetailStaff from './DetailStaff';
import FilterStaff from './FilterStaff';
import ContentPopover from './ContentPopover';


function TableContent(props) {
  // const location = useLocation()
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState()
  const [openDrawer, setOpenDrawer] = useState()
  const [loading, setLoading] = useState(true);
  const [dataStaff, setDataStaff] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const { confirm } = Modal;
  const [data, setData] = useState({})
  
  const onSelectChange = (newSelectedRowKeys) => {
    setIsChecked(!isChecked)
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // const handleCheckUrl = () =>{
  //   if(location.pathname.includes('/adminpage/staff/detailstaff'))
  //   {
  //     setOpenDrawer(true)
  //   }
  // }
  
  // khi select sẽ hiện thị chọn bao nhiêu 
  const hasSelected = selectedRowKeys.length > 0

  const showhowConfirm = () => {
    confirm({
      title: 'Xoá khách hàng ',
      content: 'Việc này sẽ xóa khách hàng được chọn. Bạn có chắc chắn muốn xóa?',
      onOk() {
          // handleDeleteAll(selectedRowKeys)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onClose = () =>{
    setOpenDrawer(false)
  }

  // Hàm lấy thông tin nhân viên
  const handleGetStaff = () =>{
    setLoading(true)
    getListUser().then((res) =>{
      // if(res.data?.items?.role?.roleName === 'STAFF'){
      // }
      setDataStaff(res?.data?.data?.items)

    }).finally(() =>{
      setLoading(false)
    })
  }

  //sử dụng để gửi yêu cầu API khi trang thay đổi
  useEffect(() =>{
    handleGetStaff()
    setLoading(false)
  },[])


  const items = [
    {
      key: '1',
      label:'Thông tin chi tiết',
      onClick: () =>{
        setOpenDrawer(true)
        
      }

    },
    {
      key: '2',
      label:'Chỉnh sửa',
      onClick: (id) =>{
        setOpenModal(true)
      }
    },
    {
      key: '3',
      label:'Xoá'
    },
  
  ];
 
  //cột thông tin của bảng
  const columns = [
    {
      title: 'Mã nhân viên',
      dataIndex: 'userId',

    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'userName',

    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date',
    },
    {
      title: 'Email',
      dataIndex: 'email',

    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',

    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updateDate',

    },
    {
      title: 'Action',
      render: (e, record, idx) => (
        <Popover trigger={['click']} placement='bottom' content={<ContentPopover data={data}/>}>
          
                {/* Khi click vào icon moreOutLine thì hiện ra các lựa chọn */}
                <Button icon={<MoreOutlined/>} className='more_option'
                  onClick={(e) => {e.preventDefault()
                  setData(record)}}
                >   
                </Button>
        </Popover>
      ),
    },

  ];
  return (
    <div>

      <PageContainer

        title='Tất cả nhân viên'
        // className='Pagecontainer'
        extra={[
          <Button
            className='button_add_member'
            onClick={() =>{
              setOpenModal(true)
            }}
          >
            + Thêm Nhân viên
          </Button> ,
          <Popover  
            placement="bottom"
            content={
              <FilterStaff/>
            }
            trigger='click'
             >
              <Button  className='filter'> 
                <FilterOutlined /> 
                Lọc
              </Button>
          </Popover>
        ]}
      >
        
        <AddStaff 
          openModal={openModal}
          onOpenChange = {(open) =>{
            if(!open) {
              setOpenModal(false)
            }
          }}
        />
        <Table 
          rowSelection={rowSelection} 
          columns={columns} 
          dataSource={dataStaff}
          loading={loading}


          size='middle' 
        />
        
           <Drawer
          title="Thông tin chi tiết của nhân viên"
          width={500}
          open={openDrawer}
          onClose={onClose}
          extra={
            <Space>
              <Button onClick={onClose}>Quay lại</Button>
            </Space>
          }>
            <DetailStaff/>
          </Drawer>
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