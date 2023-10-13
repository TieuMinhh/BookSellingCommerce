import { useState } from 'react';
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

import jwtDecode from 'jwt-decode';

import Avatar from '../../Assets/img/Avatar.jpg';

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
                                        Sport Administrator
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
                                        src={Avatar}
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
                                        Asami
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
                                to="/"
                                icon={<HiHome />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Typography variant="h9" color={colors.grey[400]} sx={{ m: '15px 0 5px 20px' }}>
                                Quản lý
                            </Typography>
                            <Item
                                title="Danh mục"
                                to="/category"
                                icon={<HiCircleStack />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Sách Bán"
                                to="/book"
                                icon={<HiCube />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Đơn hàng"
                                to="/order"
                                icon={<HiShoppingCart />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Khách hàng"
                                to="/customer"
                                icon={<HiUsers />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Typography variant="h9" color={colors.grey[400]} sx={{ m: '15px 0 5px 20px' }}>
                                Tính năng
                            </Typography>
                            <Item
                                title="Khuyến mãi"
                                to="/promotion"
                                icon={<HiCog />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Doanh thu"
                                to="/revenue"
                                icon={<AttachMoneyIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Nhà xuất bản"
                                to="/publishing-company"
                                icon={<HiCog />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Giảm giá sách"
                                to="/promotion-product"
                                icon={<HiCog />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <div
                                onClick={() => {
                                    localStorage.removeItem('accessToken');
                                    navigate('/');
                                    // setRole = 0;
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
