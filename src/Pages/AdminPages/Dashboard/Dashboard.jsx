import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';
import Header from '../../../Components/DashboardComponents/Header';
import StatBox from '../../../Components/DashboardComponents/StatBox';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <>
            <Box m="20px">
                {/* HEADER */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="TRANG CHỦ" subtitle="Chào mừng ngài đến với trang quản lý !" />
                </Box>

                {/* GRID & CHARTS */}
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
                    {/* ROW 1 */}
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title="4,200"
                            subtitle="Sản phẩm đã bán"
                            progress="0.75"
                            increase="+10%"
                            icon={
                                <ProductionQuantityLimitsIcon
                                    sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                                />
                            }
                        />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title="43.000.000 đ"
                            subtitle="Doanh thu"
                            progress="0.50"
                            increase="+20%"
                            icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                        />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title="2,500"
                            subtitle="Khách hàng mới"
                            progress="0.30"
                            increase="+5%"
                            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                        />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title="50.000.000 đ"
                            subtitle="Tổng danh thu"
                            progress="0.80"
                            increase="+30%"
                            icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Dashboard;
