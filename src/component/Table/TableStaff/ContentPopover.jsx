import { Button, Popconfirm, Space } from "antd"
import { delUser } from "../../../services/lead"

function ContentPopover ({data}) {
    const handleDeleteUser = (data) => {
        delUser(data.userId).then()
    }
    return (<Space direction='vertical'>
        <Button style={{width: "100%"}}>Sửa</Button>
        <Popconfirm
            title="Delete the task"
            description="Bạn có đồng ý muốn xóa user này ?"
            onConfirm={handleDeleteUser}
            okText="Đồng ý"
            cancelText="Không"
        >
            <Button type="default">Xóa</Button>
        </Popconfirm>
        <Button>Xem chi tiết</Button>
    </Space>)
}
export default ContentPopover