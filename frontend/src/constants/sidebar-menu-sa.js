import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/sapi/dashboard',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: ProductIcon,
        path: '/sapi/addCategory',
        title: 'Add Category',
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/sapi/registerVendor',
        title: 'Register Vendor',
    },
    {
        id: 4,
        icon: ShippingIcon,
        path: '/sapi/ShowAllVendor',
        title: 'All Vendors',
    }, 
]

export default sidebar_menu;