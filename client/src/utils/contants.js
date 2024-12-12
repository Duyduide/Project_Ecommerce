import path from './path'
import icons from './icons'

export const navigation = [
]
const { AiOutlineDashboard, MdOutlineGroups, RiProductHuntLine, TbFileInvoice, UserCog, ShoppingBag} = icons;
export const adminSidebar = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Quản lý tài khoản',
        path: `/${path.ADMIN}/${path.MANAGE_USERS}`,
        icon: <MdOutlineGroups size={20}/>
    },
    {
        id: 2,
        type: 'PARENT',
        text: 'Quản lý sản phẩm',
        icon: <RiProductHuntLine size={20}/>,
        submenu: [
            {
                text: 'Tạo sản phẩm',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`
            },
            {
                text: 'Chỉnh sửa sản phẩm',
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`
            }
        ]
    },
    {
        id: 3,
        type: 'SINGLE',
        text: 'Quản lý đơn hàng',
        path: `/${path.ADMIN}/${path.MANAGE_ORDERS}`,
        icon: <TbFileInvoice size={20}/> 
    },
]
export const memberSidebar = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Thông tin cá nhân',
        icon: <UserCog size={20}/>,
        path: `/${path.MEMBER}/${path.PERSONAL}`,
    },
    {
        id: 2,
        type: 'SINGLE',
        text: 'Lịch sử đơn hàng',
        icon: <ShoppingBag size={20}/>,
        path: `/${path.MEMBER}/${path.ORDER_HISTORY}`,
    }
]