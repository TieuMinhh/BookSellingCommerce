import './HomePage.scss';
import {
    TrendImg,
    IconMenu,
    Item1,
    Item2,
    Item3,
    Item4,
    Item5,
    Item6,
    Item7,
    Item8,
    Item9,
    Item10,
    Banner1,
    Banner2,
    Banner3,
    Banner4,
    Banner5,
    Banner6,
    Banner7,
} from '../../Assets/img/index.js';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../api/axios';
import { useEffect } from 'react';
import config from '../../api/base';
import Loading from '../../Components/Loading/Loading';

import MostCard from '../../Components/MostCard/MostCard';

export default function HomePage() {
    const [numberCate, setNumberCate] = useState(1);
    const [listCategory, setListCategory] = useState([]);
    const [listMostBuyProduct, setListMostBuyProduct] = useState([]);
    const [listMostReducingProduct, setListMostReducingProduct] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);

    async function getListCategory() {
        let result = await axios.get(axios.defaults.baseURL + `/category?id=ALL`);
        setListCategory(result?.data.listCategory);
    }

    async function getListMostByProduct() {
        try {
            setLoadingAction(true);
            let result = await axios.get(axios.defaults.baseURL + `/most-by-product`);
            setListMostBuyProduct(result?.data.listMostBuyProduct);
            setTimeout(() => {
                setLoadingAction(false);
            }, 1000);
        } catch (error) {
            setLoadingAction(false);
        }
    }

    async function getListMostReducingProduct() {
        let result = await axios.get(axios.defaults.baseURL + `/most-reducing-product`);
        setListMostReducingProduct(result?.data.listMostReducingProduct);
    }

    const handleTabClick = (tabName) => {
        setNumberCate(tabName);
    };

    const navigate = useNavigate();

    const handleCategoryClick = async (item) => {
        try {
            const result = await axios.post(axios.defaults.baseURL + '/search-product-by-id-category', {
                id_category: item.id_category,
            });

            // Chuyển hướng đến trang product cùng với kết quả tìm kiếm
            navigate(`/product?category=${item.id_category}`, { state: { searchResult3: result.data.message } });
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const items = [
        {
            img: <img loading="lazy" src={Item1} alt="" />,
            text: <p>Sale Thứ 3</p>,
        },
        {
            img: <img loading="lazy" src={Item2} alt="" />,
            text: <p>Phái đẹp</p>,
        },
        {
            img: <img loading="lazy" src={Item3} alt="" />,
            text: <p>Flash Sale</p>,
        },
        {
            img: <img loading="lazy" src={Item4} alt="" />,
            text: <p>Mã Giảm Giá</p>,
        },
        {
            img: <img loading="lazy" src={Item5} alt="" />,
            text: <p>Đồ Chơi</p>,
        },
        {
            img: <img loading="lazy" src={Item6} alt="" />,
            text: <p>Máy Tính</p>,
        },
        {
            img: <img loading="lazy" src={Item7} alt="" />,
            text: <p>Thiếu Nhi</p>,
        },
        {
            img: <img loading="lazy" src={Item8} alt="" />,
            text: <p>Sản Phẩm Mới</p>,
        },
        {
            img: <img loading="lazy" src={Item9} alt="" />,
            text: <p>Manga</p>,
        },
        {
            img: <img loading="lazy" src={Item10} alt="" />,
            text: <p>Phiên Chợ Sách cũ</p>,
        },
    ];

    useEffect(() => {
        getListCategory();
        getListMostByProduct();
        getListMostReducingProduct();
    }, []);

    return (
        <div className="wrapper-content-homepage">
            {loading && <Loading hash size={60} />}
            {loadingAction && <Loading pacman size={40} />}

            <div className="container-content-homepage">
                <div className="content-banner-homepage">
                    <div className="content-top-banner">
                        <div className="content-slider-banner">
                            <img loading="lazy" src={Banner1} alt="" />
                        </div>
                        <div className="content-right-slider">
                            <div className="cover-right-img" style={{ paddingBottom: '10px', boxSizing: 'border-box' }}>
                                <img loading="lazy" src={Banner2} alt="" />
                            </div>
                            <div className="cover-right-img">
                                <img loading="lazy" src={Banner3} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="content-bottom-banner">
                        <div className="sub-bottom-banner" style={{ marginRight: '12px' }}>
                            <img loading="lazy" src={Banner4} alt="" />
                        </div>
                        <div className="sub-bottom-banner" style={{ marginRight: '12px' }}>
                            <img loading="lazy" src={Banner5} alt="" />
                        </div>
                        <div className="sub-bottom-banner" style={{ marginRight: '12px' }}>
                            <img loading="lazy" src={Banner6} alt="" />
                        </div>
                        <div className="sub-bottom-banner">
                            <img loading="lazy" src={Banner7} alt="" />
                        </div>
                    </div>
                </div>

                <div className="content-item-homepage">
                    {items.map((item, index) => (
                        <div key={index} className="cover-content-item">
                            {item.img}
                            {item.text}
                        </div>
                    ))}
                </div>

                <div className="content-cate-homepage">
                    <div className="cover-title">
                        <img loading="lazy" src={IconMenu} alt="" />
                        <p className="title-content-cate">Danh mục sản phẩm</p>
                    </div>

                    <div className="detail-cate-item">
                        {listCategory &&
                            listCategory.map((item, index) => {
                                return (
                                    <div
                                        className="cover-content-item"
                                        key={index}
                                        onClick={() => handleCategoryClick(item)}
                                    >
                                        <img
                                            src={`${config.PUBLIC_IMAGE_URL}${item && item?.logo}`}
                                            alt=""
                                            className="avatar-image"
                                        />
                                        <p>{item && item?.name_category}</p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className="content-trend-homepage">
                    <div className="cover-top-trend">
                        <div className="title-trend">
                            <img loading="lazy" src={TrendImg} alt="" />
                            <p>Xu hướng mua sắm</p>
                        </div>
                    </div>
                    <div className="cate-trend-content">
                        <NavLink to="/">
                            <p
                                className={numberCate === 1 ? 'item-cate-trend active' : 'item-cate-trend '}
                                onClick={() => handleTabClick(1)}
                            >
                                Sản phẩm bán chạy
                            </p>
                        </NavLink>
                        <NavLink to="/" onClick={() => setNumberCate(2)}>
                            <p
                                className={numberCate === 2 ? 'item-cate-trend active' : 'item-cate-trend '}
                                onClick={() => handleTabClick(2)}
                            >
                                Sách HOT - Giảm sốc
                            </p>
                        </NavLink>
                        <NavLink to="/" onClick={() => setNumberCate(3)}>
                            <p
                                className={numberCate === 3 ? 'item-cate-trend active' : 'item-cate-trend '}
                                onClick={() => handleTabClick(3)}
                            >
                                Bestseller
                            </p>
                        </NavLink>
                    </div>

                    {numberCate === 1 && (
                        <div className="book-trend-content">
                            {listMostBuyProduct &&
                                listMostBuyProduct?.map((item, index) => {
                                    return (
                                        <MostCard
                                            key={item.id_product}
                                            link={item && item.id_product}
                                            images={item && item?.images}
                                            percentage={item && item?.percentage}
                                            name_product={item && item?.name_product}
                                            price_reducing={item && item?.price_reducing}
                                            price={item && item?.price}
                                        ></MostCard>
                                    );
                                })}
                        </div>
                    )}

                    {numberCate === 2 && (
                        <div className="book-trend-content">
                            {loading && <Loading hash size={60} />}
                            {listMostReducingProduct &&
                                listMostReducingProduct?.map((item, index) => {
                                    return (
                                        <MostCard
                                            key={item.id_product}
                                            link={item && item.id_product}
                                            images={item && item?.images}
                                            percentage={item && item?.percentage}
                                            name_product={item && item?.name_product}
                                            price_reducing={item && item?.price_reducing}
                                            price={item && item?.price}
                                        ></MostCard>
                                    );
                                })}
                        </div>
                    )}

                    {numberCate === 3 && (
                        <div className="book-trend-content">
                            {loading && <Loading hash size={60} />}
                            {listMostReducingProduct &&
                                listMostReducingProduct?.map((item, index) => {
                                    return (
                                        <MostCard
                                            key={item.id_product}
                                            link={item && item.id_product}
                                            images={item && item?.images}
                                            percentage={item && item?.percentage}
                                            name_product={item && item?.name_product}
                                            price_reducing={item && item?.price_reducing}
                                            price={item && item?.price}
                                        ></MostCard>
                                    );
                                })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
