import { useState, useEffect, useContext } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { FaSignOutAlt } from 'react-icons/fa';
import { HiHome, HiCube, HiShoppingCart, HiUsers, HiCog } from 'react-icons/hi';
import { HiCircleStack } from 'react-icons/hi2';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';

import axios from '../../api/axios';
import { getToken } from '../../Services/Token';
import config from '../../api/base';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Trang chủ');
    const navigate = useNavigate();
    // var [role, setRole] = useState(
    //   jwtDecode(localStorage.getItem("accessToken")).role_id
    // );

    // const role = jwtDecode(
    //   localStorage.getItem("accessToken")
    // ).role_id;

    const authContext = useContext(AuthContext);

    const [user, getUser] = useState([]);
    const [change, setChange] = useState([]);

    const getInfoUser = async () => {
        let token = await getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let result = await axios.get(axios.defaults.baseURL + '/account/info');
        getUser(result.data.userInfo);
        console.log('Check token neeee:', result.data.userInfo);
    };

    useEffect(() => {
        getInfoUser();
    }, [change]);

    return (
        <div>
            <Box
                sx={{
                    '& .pro-sidebar-inner': {
                        background: `${colors.primary[400]} !important`,
                    },
                    '& .pro-icon-wrapper': {
                        backgroundColor: 'transparent !important',
                    },
                    '& .pro-inner-item': {
                        padding: '5px 35px 5px 20px !important',
                    },
                    '& .pro-inner-item:hover': {
                        color: '#868dfb !important',
                    },
                    '& .pro-menu-item.active': {
                        color: '#6870fa !important',
                    },
                }}
            >
                <ProSidebar collapsed={isCollapsed}>
                    <Menu iconShape="square">
                        {/* LOGO AND MENU ICON */}
                        <MenuItem
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                            style={{
                                margin: '10px 0 20px 0',
                                color: colors.grey[100],
                            }}
                        >
                            {!isCollapsed && (
                                <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                    <Typography variant="h5" color={colors.grey[100]}>
                                        Book Shop Administrator
                                    </Typography>
                                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </MenuItem>

                        {!isCollapsed && (
                            <Box mb="25px">
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <img
                                        alt="profile-user"
                                        src={`${config.PUBLIC_IMAGE_URL}${user && user?.avatar}`}
                                        style={{
                                            width: '120px',
                                            height: '120px',
                                            cursor: 'pointer',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                                <Box textAlign="center">
                                    <Typography
                                        variant="h3"
                                        color={colors.grey[100]}
                                        fontWeight="bold"
                                        sx={{ m: '10px 0 0 0' }}
                                    >
                                        {user && user?.name}
                                    </Typography>
                                    <Typography variant="h6" color={colors.greenAccent[500]}>
                                        Quản trị viên
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                            <Item
                                title="Trang chủ"
                                to="/admin"
                                icon={<HiHome />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Typography variant="h9" color={colors.grey[400]} sx={{ m: '15px 0 5px 20px' }}>
                                Quản lý
                            </Typography>
                            <Item
                                title="Danh mục"
                                to="/admin/category"
                                icon={<HiCircleStack />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Sách Bán"
                                to="/admin/book"
                                icon={<HiCube />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Đơn hàng"
                                to="/admin/order"
                                icon={<HiShoppingCart />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Khách hàng"
                                to="/admin/customer"
                                icon={<HiUsers />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Typography variant="h9" color={colors.grey[400]} sx={{ m: '15px 0 5px 20px' }}>
                                Tính năng
                            </Typography>
                            <Item
                                title="Khuyến mãi"
                                to="/admin/promotion"
                                icon={<HiCog />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Doanh thu"
                                to="/admin/revenue"
                                icon={<AttachMoneyIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Nhà xuất bản"
                                to="/admin/publishing-company"
                                icon={<HiCog />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Giảm giá sách"
                                to="/admin/promotion-product"
                                icon={<HiCog />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <div
                                onClick={() => {
                                    localStorage.removeItem('accessToken');
                                    navigate('/');
                                    authContext.handleChangeRole();
                                }}
                            >
                                <Item
                                    title="Đăng xuất"
                                    // to="/login"
                                    icon={<FaSignOutAlt />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </div>
                        </Box>
                    </Menu>
                </ProSidebar>
            </Box>
        </div>
    );
};

export default Sidebar;
