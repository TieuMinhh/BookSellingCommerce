import './HomePage.scss';
import Banner1 from '../../Assets/img/banner1.png';
import Banner2 from '../../Assets/img/banner2.jpg';
import Banner3 from '../../Assets/img/banner3.jpg';
import Banner4 from '../../Assets/img/banner4.jpg';
import Banner5 from '../../Assets/img/banner5.jpg';
import Banner6 from '../../Assets/img/banner6.jpg';
import Banner7 from '../../Assets/img/banner7.jpg';

import Item1 from '../../Assets/img/item1.png';
import Item2 from '../../Assets/img/item2.png';
import Item3 from '../../Assets/img/item3.png';
import Item4 from '../../Assets/img/item4.png';
import Item5 from '../../Assets/img/item5.png';
import Item6 from '../../Assets/img/item6.png';
import Item7 from '../../Assets/img/item7.png';
import Item8 from '../../Assets/img/item8.png';
import Item9 from '../../Assets/img/item9.png';
import Item10 from '../../Assets/img/item10.png';
import TrendImg from '../../Assets/img/trend-buy.png';
import IconMenu from '../../Assets/img/icon-menu.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../api/axios';
import { useEffect } from 'react';
import config from '../../api/base';

export default function HomePage() {
    const [numberCate, setNumberCate] = useState(1);
    const [listCategory, setListCategory] = useState([]);
    const [listMostBuyProduct, setListMostBuyProduct] = useState([]);
    const [listMostReducingProduct, setListMostReducingProduct] = useState([]);

    async function getListCategory() {
        let result = await axios.get(axios.defaults.baseURL + `/category?id=ALL`);
        setListCategory(result?.data.listCategory);
        // console.log(result.data);
    }

    async function getListMostByProduct() {
        let result = await axios.get(axios.defaults.baseURL + `/most-by-product`);
        setListMostBuyProduct(result?.data.listMostBuyProduct);
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

    useEffect(() => {
        getListCategory();
        getListMostByProduct();
        getListMostReducingProduct();
    }, []);

    return (
        <div className="wrapper-content-homepage">
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
                    <div className="cover-content-item">
                        <img loading="lazy" src={Item1} alt="" />
                        <p>Sale Thứ 3</p>
                    </div>
                    <div className="cover-content-item">
                        <img loading="lazy" src={Item2} alt="" />
                        <p>Phái đẹp</p>
                    </div>
                    <div className="cover-content-item">
                        <img loading="lazy" src={Item3} alt="" />
                        <p>Flash Sale</p>
                    </div>
                    <div className="cover-content-item">
                        <img loading="lazy" src={Item4} alt="" />
                        <p>Mã Giảm Giá</p>
                    </div>
                    <div className="cover-content-item">
                        <img loading="lazy" src={Item5} alt="" />
                        <p>Đồ Chơi</p>
                    </div>
                    <div className="cover-content-item">
                        <img loading="lazy" src={Item6} alt="" />
                        <p>Máy Tính</p>
                    </div>
                    <div className="cover-content-item">
                        <img loading="lazy" src={Item7} alt="" />
                        <p>Thiếu Nhi</p>
                    </div>
                    <div className="cover-content-item">
                        <img loading="lazy" src={Item8} alt="" />
                        <p>Sản Phẩm Mới</p>
                    </div>
                    <div className="cover-content-item">
                        <img loading="lazy" src={Item9} alt="" />
                        <p>Manga</p>
                    </div>
                    <div className="cover-content-item">
                        <img loading="lazy" src={Item10} alt="" />
                        <p>Phiên Chợ Sách cũ</p>
                    </div>
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
                                Bestseller Florentino
                            </p>
                        </NavLink>
                    </div>

                    {numberCate === 1 && (
                        <div className="book-trend-content">
                            {listMostBuyProduct &&
                                listMostBuyProduct?.map((item, index) => {
                                    return (
                                        <Link to={`/book/detail?id=${item.id_product}`} key={item.id_product}>
                                            <div className="item-book-trend">
                                                <div className="cover-img-trend">
                                                    <img
                                                        loading="lazy"
                                                        src={`${config.PUBLIC_IMAGE_URL}${item.images}`}
                                                        alt=""
                                                        className="avatar-image"
                                                        style={{ height: '100px' }}
                                                    />
                                                    <div className="promotion-corner-trend">
                                                        <span className="detail-promotion-trend">
                                                            -{item && item?.percentage}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="item-trend-name">{item && item?.name_product}</p>
                                                <p className="item-trend-price">
                                                    {item &&
                                                        item?.price_reducing.toLocaleString('vi', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                </p>
                                                <p className="item-price-old">
                                                    {item &&
                                                        item?.price.toLocaleString('vi', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                </p>
                                                <div className="main-rate">
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-regular fa-star"></i>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </div>
                    )}

                    {numberCate === 2 && (
                        <div className="book-trend-content">
                            {listMostReducingProduct &&
                                listMostReducingProduct?.map((item, index) => {
                                    return (
                                        <Link to={`/book/detail?id=${item.id_product}`} key={item.id_product}>
                                            <div className="item-book-trend">
                                                <div className="cover-img-trend">
                                                    <img
                                                        loading="lazy"
                                                        src={`${config.PUBLIC_IMAGE_URL}${item && item?.images}`}
                                                        alt=""
                                                        className="avatar-image"
                                                        style={{ height: '100px' }}
                                                    />
                                                    <div className="promotion-corner-trend">
                                                        <span className="detail-promotion-trend">
                                                            -{item && item?.percentage}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="item-trend-name">{item && item?.name_product}</p>
                                                <p className="item-trend-price">
                                                    {item &&
                                                        item?.price_reducing.toLocaleString('vi', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                </p>
                                                <p className="item-price-old">
                                                    {item &&
                                                        item?.price.toLocaleString('vi', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                </p>
                                                <div className="main-rate">
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-regular fa-star"></i>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
