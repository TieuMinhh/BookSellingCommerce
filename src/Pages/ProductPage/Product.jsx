import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import './Product.scss';
import Filter from '../../Components/FilterBook/Filter';
import { Link, useLocation } from 'react-router-dom';
import config from '../../api/base';

export default function Home() {
    const [change, setChange] = useState(false);
    const [list, setList] = useState([]);
    const [currentIndexPage, setCurrentIndexPage] = useState(1);

    async function getListProduct() {
        const result = await axios.get(axios.defaults.baseURL + `/api/v1/admin/product?id=ALL`);
        setList(result?.data.listProduct);
        // console.log(result.data);
    }

    // const [page, setPage] = useState(1);
    // const searchParams = new URLSearchParams(location.search);
    // const currentPage = parseInt(searchParams.get('page'));
    // console.log('Trang hiện tại là :', currentPage);

    // async function getListProduct(page) {
    //     const result = await axios.get(axios.defaults.baseURL + `/api/v1/product-by-pages?page=${page}`);
    //     setList(result?.data.listProduct);
    //     console.log(result.data);
    // }

    const location = useLocation();

    // Trích xuất thông tin tìm kiếm từ đối tượng location.state
    const searchResult = location.state?.searchResult;
    console.log('searchProduct là :', searchResult);

    // Trích xuất thông tin tìm kiếm từ đối tượng location.state
    const searchResult2 = location.state?.searchResult2;
    console.log('searchProduct2 là :', searchResult2);

    // Trích xuất thông tin tìm kiếm từ đối tượng location.state
    const searchResult3 = location.state?.searchResult3;
    console.log('searchProduct3 là :', searchResult3);

    useEffect(() => {
        getListProduct();
    }, [change]);

    return (
        <>
            {searchResult ? (
                <div class="content row grid wide">
                    <div class="container_content">
                        <div class="header-container">
                            {/* <h1 class="header-container-categories">Premier League</h1> */}
                            <div class="header-container-icon">
                                <i class="fa-solid fa-bars"></i>
                                <i class="fa-solid fa-table-list"></i>
                            </div>
                            <div class="header-container-select">
                                <select id="cars" name="cars">
                                    <option>Giá tăng dần</option>
                                    <option>Mặc định</option>
                                    <option>A → Z</option>
                                    <option>Giá tăng dần</option>
                                    <option>Giá giảm dần</option>
                                    <option>Hàng mới nhất</option>
                                    <option>Hàng cũ nhất</option>
                                    <option>Giá tăng dần</option>
                                </select>
                            </div>
                        </div>

                        <div class="wrapper-content">
                            <Filter />

                            <div class="main-content">
                                <div class="main-list row">
                                    {searchResult &&
                                        searchResult.map((item, index) => {
                                            return (
                                                <div class="main-list-item">
                                                    <Link to={`/book/detail?id=${item && item?.id_product}`}>
                                                        <div class="main-discription mt-8 mb-8">
                                                            <div className="cover-img-product">
                                                                <img
                                                                    src={`${config.PUBLIC_IMAGE_URL}${
                                                                        item && item?.images
                                                                    }`}
                                                                    alt=""
                                                                    className="avatar-image-product"
                                                                />
                                                                <div className="promotion-percentent-circle">
                                                                    <span className="detail-number-percent">
                                                                        -{item && item.percentage}%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <p class="item-desp">{item && item?.name_product}</p>
                                                        </div>
                                                        <div class="main-price">
                                                            <p>
                                                                {item &&
                                                                    item?.price_reducing.toLocaleString('vi', {
                                                                        style: 'currency',
                                                                        currency: 'VND',
                                                                    })}{' '}
                                                            </p>
                                                            <span>
                                                                {item &&
                                                                    item?.price.toLocaleString('vi', {
                                                                        style: 'currency',
                                                                        currency: 'VND',
                                                                    })}
                                                            </span>
                                                        </div>
                                                        <div class="main-rate">
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-regular fa-star"></i>
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>

                        <div class="last-container">
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 1 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(1)}
                                >
                                    1
                                </p>
                            </div>
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 2 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(2)}
                                >
                                    2
                                </p>
                            </div>
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 3 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(3)}
                                >
                                    3
                                </p>
                            </div>
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 4 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(4)}
                                >
                                    4
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : searchResult2 ? (
                <div class="content row grid wide">
                    <div class="container_content">
                        <div class="header-container">
                            <div class="header-container-icon">
                                <i class="fa-solid fa-bars"></i>
                                <i class="fa-solid fa-table-list"></i>
                            </div>
                            <div class="header-container-select">
                                <select id="cars" name="cars">
                                    <option>Giá tăng dần</option>
                                    <option>Mặc định</option>
                                    <option>A → Z</option>
                                    <option>Giá tăng dần</option>
                                    <option>Giá giảm dần</option>
                                    <option>Hàng mới nhất</option>
                                    <option>Hàng cũ nhất</option>
                                    <option>Giá tăng dần</option>
                                </select>
                            </div>
                        </div>

                        <div class="wrapper-content">
                            <Filter />

                            <div class="main-content">
                                <div class="main-list row">
                                    {searchResult2 &&
                                        searchResult2.map((item, index) => {
                                            return (
                                                <div class="main-list-item">
                                                    <Link to={`/book/detail?id=${item && item?.id_product}`}>
                                                        <div class="main-discription mt-8 mb-8">
                                                            <div className="cover-img-product">
                                                                <img
                                                                    src={`${config.PUBLIC_IMAGE_URL}${
                                                                        item && item?.images
                                                                    }`}
                                                                    alt=""
                                                                    className="avatar-image-product"
                                                                />
                                                                <div className="promotion-percentent-circle">
                                                                    <span className="detail-number-percent">
                                                                        -{item && item.percentage}%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <p class="item-desp">{item && item?.name_product}</p>
                                                        </div>
                                                        <div class="main-price">
                                                            <p>
                                                                {item &&
                                                                    item?.price_reducing.toLocaleString('vi', {
                                                                        style: 'currency',
                                                                        currency: 'VND',
                                                                    })}{' '}
                                                            </p>
                                                            <span>
                                                                {item &&
                                                                    item?.price.toLocaleString('vi', {
                                                                        style: 'currency',
                                                                        currency: 'VND',
                                                                    })}
                                                            </span>
                                                        </div>
                                                        <div class="main-rate">
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-regular fa-star"></i>
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>

                        <div class="last-container">
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 1 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(1)}
                                >
                                    1
                                </p>
                            </div>
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 2 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(2)}
                                >
                                    2
                                </p>
                            </div>
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 3 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(3)}
                                >
                                    3
                                </p>
                            </div>
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 4 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(4)}
                                >
                                    4
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : searchResult3 ? (
                <div class="content row grid wide">
                    <div class="container_content">
                        <div class="header-container">
                            <div class="header-container-icon">
                                <i class="fa-solid fa-bars"></i>
                                <i class="fa-solid fa-table-list"></i>
                            </div>
                            <div class="header-container-select">
                                <select id="cars" name="cars">
                                    <option>Giá tăng dần</option>
                                    <option>Mặc định</option>
                                    <option>A → Z</option>
                                    <option>Giá tăng dần</option>
                                    <option>Giá giảm dần</option>
                                    <option>Hàng mới nhất</option>
                                    <option>Hàng cũ nhất</option>
                                    <option>Giá tăng dần</option>
                                </select>
                            </div>
                        </div>

                        <div class="wrapper-content">
                            <Filter />

                            <div class="main-content">
                                <div class="main-list row">
                                    {searchResult3 &&
                                        searchResult3.map((item, index) => {
                                            return (
                                                <div class="main-list-item">
                                                    <Link to={`/book/detail?id=${item && item?.id_product}`}>
                                                        <div class="main-discription mt-8 mb-8">
                                                            <div className="cover-img-product">
                                                                <img
                                                                    src={`${config.PUBLIC_IMAGE_URL}${
                                                                        item && item?.images
                                                                    }`}
                                                                    alt=""
                                                                    className="avatar-image-product"
                                                                />
                                                                <div className="promotion-percentent-circle">
                                                                    <span className="detail-number-percent">
                                                                        -{item && item.percentage}%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <p class="item-desp">{item && item?.name_product}</p>
                                                        </div>
                                                        <div class="main-price">
                                                            <p>
                                                                {item &&
                                                                    item?.price_reducing.toLocaleString('vi', {
                                                                        style: 'currency',
                                                                        currency: 'VND',
                                                                    })}{' '}
                                                            </p>
                                                            <span>
                                                                {item &&
                                                                    item?.price.toLocaleString('vi', {
                                                                        style: 'currency',
                                                                        currency: 'VND',
                                                                    })}
                                                            </span>
                                                        </div>
                                                        <div class="main-rate">
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-regular fa-star"></i>
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>

                        <div class="last-container">
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 1 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(1)}
                                >
                                    1
                                </p>
                            </div>
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 2 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(2)}
                                >
                                    2
                                </p>
                            </div>
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 3 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(3)}
                                >
                                    3
                                </p>
                            </div>
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 4 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(4)}
                                >
                                    4
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div class="content row grid wide">
                    <div class="container_content">
                        <div class="header-container">
                            <div class="header-container-icon">
                                <i class="fa-solid fa-bars"></i>
                                <i class="fa-solid fa-table-list"></i>
                            </div>
                            <div class="header-container-select">
                                <select id="cars" name="cars">
                                    <option>Giá tăng dần</option>
                                    <option>Mặc định</option>
                                    <option>A → Z</option>
                                    <option>Giá tăng dần</option>
                                    <option>Giá giảm dần</option>
                                    <option>Hàng mới nhất</option>
                                    <option>Hàng cũ nhất</option>
                                    <option>Giá tăng dần</option>
                                </select>
                            </div>
                        </div>

                        <div class="wrapper-content">
                            <Filter />

                            <div class="main-content">
                                <div class="main-list row">
                                    {list &&
                                        list.map((item, index) => {
                                            return (
                                                <div class="main-list-item">
                                                    <Link to={`/book/detail?id=${item.id_product}`}>
                                                        <div class="main-discription mt-8 mb-8">
                                                            <div className="cover-img-product">
                                                                <img
                                                                    src={`${config.PUBLIC_IMAGE_URL}${
                                                                        item && item?.images
                                                                    }`}
                                                                    alt=""
                                                                    className="avatar-image-product"
                                                                />
                                                                <div className="promotion-percentent-circle">
                                                                    <span className="detail-number-percent">
                                                                        -{item && item.percentage}%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <p class="item-desp">{item.name_product}</p>
                                                        </div>
                                                        <div class="main-price">
                                                            <p>
                                                                {item.price_reducing.toLocaleString('vi', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                })}{' '}
                                                            </p>
                                                            <span>
                                                                {item.price.toLocaleString('vi', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                })}
                                                            </span>
                                                        </div>
                                                        <div class="main-rate">
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-solid fa-star"></i>
                                                            <i class="fa-regular fa-star"></i>
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>

                        <div class="last-container">
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 1 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(1)}
                                >
                                    1
                                </p>
                            </div>
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 2 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(2)}
                                >
                                    2
                                </p>
                            </div>
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 3 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(3)}
                                >
                                    3
                                </p>
                            </div>
                            <div class="container-page">
                                <p
                                    class={currentIndexPage === 4 ? 'page-number active' : 'page-number'}
                                    onClick={() => setCurrentIndexPage(4)}
                                >
                                    4
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
