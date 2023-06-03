import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: ProductIcon,
        path: '/orders',
        title: 'Orders',
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/products',
        title: 'Vendor',
    },
    {
        id: 5,
        icon: ShippingIcon,
        path: './Register',
        title: 'Create Vendor',
    },
    {
        id: 4,
        icon: UserIcon,
        path: '/profile',
        title: 'My account',
    },
    {
        id: 6,
        icon: ShippingIcon,
        path: './AddCategory',
        title: 'Create Category',
    },
    {
        id: 7,
        icon: ShippingIcon,
        path: './EditProfileUser',
        title: 'Edit Profile',
    },
    
    
]

export default sidebar_menu;