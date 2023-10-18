import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import './Product.scss';
import Filter from '../../Components/FilterBook/Filter';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import config from '../../api/base';

export default function Home() {
    const [list, setList] = useState([]);
    const [change, setChange] = useState([]);
    const [currentIndexPage, setCurrentIndexPage] = useState(1);
    const [listPage, setListPage] = useState([1]);

    useEffect(() => {
        async function getAllProduct() {
            const result = await axios.get(axios.defaults.baseURL + `/api/v1/admin/product?id=ALL`);
            console.log('length list: ', result?.data.listProduct.length);
            let countPage = result?.data.listProduct.length / 8;
            if (countPage % 8 !== 0) {
                countPage += 1;
            }
            setListPage([]); // Xóa hết giá trị cũ trong listPage
            for (let i = 1; i <= Math.floor(countPage); i++) {
                setListPage((prevListPage) => [...prevListPage, i]);
            }
        }
        getAllProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [change]);

    const location = useLocation();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);

    async function getListProduct(page) {
        const result = await axios.get(axios.defaults.baseURL + `/api/v1/product-by-pages?page=${page}`);
        setList(result?.data.listProduct);
    }

    const handlePreviousPage = () => {
        const prevPage = currentPage > 1 ? currentPage - 1 : 1;
        setCurrentIndexPage(prevPage);

        navigate(`?page=${prevPage}`);
    };

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        setCurrentIndexPage(nextPage);
        navigate(`?page=${nextPage}`);
    };

    const handleCurrentPage = (currentPage) => {
        navigate(`?page=${currentPage}`);
    };

    function sortProductsByPriceDescending(list) {
        return list.sort((a, b) => b.price_reducing - a.price_reducing);
    }

    function sortProductsByPriceAscending(list) {
        return list.sort((a, b) => a.price_reducing - b.price_reducing);
    }

    function sortProductsByAToZ(list) {
        return list.sort((a, b) => a.name_product.localeCompare(b.name_product));
    }

    function sortProductsByLatest(list) {
        return list.sort((a, b) => new Date(b.created_time) - new Date(a.created_time));
    }

    function sortProductsByOldest(list) {
        return list.sort((a, b) => new Date(a.created_time) - new Date(b.created_time));
    }

    const [sortBy, setSortBy] = useState('default');

    const handleSortChange = (event) => {
        const selectedValue = event.target.value;
        console.log(event.target.value);
        setSortBy(selectedValue);
        let sortedList = [...list];
        switch (selectedValue) {
            case 'price-descending':
                sortedList = sortProductsByPriceDescending(sortedList);
                break;
            case 'price-ascending':
                sortedList = sortProductsByPriceAscending(sortedList);
                break;
            case 'a-to-z':
                sortedList = sortProductsByAToZ(sortedList);
                break;
            case 'latest':
                sortedList = sortProductsByLatest(sortedList);
                break;
            case 'oldest':
                sortedList = sortProductsByOldest(sortedList);
                break;
            case 'default':
                sortedList = [...list]; // Đặt lại danh sách ban đầu
                break;
            default:
                sortedList = [...list];
                break;
        }

        setList([...sortedList]); // Cập nhật list với mảng mới đã sắp xếp
        setChange(!change);
        console.log('Danh sách sản phẩm sau khi sắp xếp:', list);
    };

    // useEffect(() => {
    //     const searchParams = new URLSearchParams(location.search);
    //     const page = parseInt(searchParams.get('page'));
    //     if (!page) {
    //         navigate('?page=1');
    //     } else {
    //         setCurrentPage(page);
    //         getListProduct(page);
    //     }
    // }, [location.search]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = parseInt(searchParams.get('page'));

        setCurrentPage(page);
        getListProduct(page);
    }, [location.search]);

    // Trích xuất thông tin tìm kiếm từ đối tượng location.state
    const searchResult = location.state?.searchResult;

    // Trích xuất thông tin tìm kiếm từ đối tượng location.state
    const searchResult2 = location.state?.searchResult2;

    // Trích xuất thông tin tìm kiếm từ đối tượng location.state
    const searchResult3 = location.state?.searchResult3;

    return (
        <>
            {searchResult ? (
                <div class="content row grid wide">
                    <div class="container_content">
                        <div class="header-container">
                            <div class="header-container-icon">
                                <i class="fa-solid fa-bars"></i>
                                <i class="fa-solid fa-table-list"></i>
                            </div>
                            <div class="header-container-select">
                                <select id="cars" name="cars">
                                    <option>Mặc định</option>
                                    <option>A → Z</option>
                                    <option>Giá tăng dần</option>
                                    <option>Giá giảm dần</option>
                                    <option>Hàng mới nhất</option>
                                    <option>Hàng cũ nhất</option>
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
                                                                {item && item.price_reducing
                                                                    ? item.price_reducing.toLocaleString('vi', {
                                                                          style: 'currency',
                                                                          currency: 'VND',
                                                                      })
                                                                    : ''}
                                                            </p>

                                                            <span>
                                                                {item && item.price
                                                                    ? item.price.toLocaleString('vi', {
                                                                          style: 'currency',
                                                                          currency: 'VND',
                                                                      })
                                                                    : ''}
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
                            {/* <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                <i class="fa-solid fa-chevron-left"></i>
                            </button> */}
                            <div class="container-page">
                                <p className="right-page">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </p>
                            </div>
                            {listPage.map((pageNumber) => (
                                <div class="container-page" key={pageNumber}>
                                    <p
                                        class={currentIndexPage === pageNumber ? 'page-number active' : 'page-number'}
                                        onClick={() => setCurrentIndexPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </p>
                                </div>
                            ))}
                            {/* <button onClick={handleNextPage} disabled={list.length === 0}>
                                <i class="fa-solid fa-chevron-right"></i>
                            </button> */}
                            <div class="container-page">
                                <p className="left-page">
                                    <i class="fa-solid fa-chevron-right"></i>
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
                                    <option>Mặc định</option>
                                    <option>A → Z</option>
                                    <option>Giá tăng dần</option>
                                    <option>Giá giảm dần</option>
                                    <option>Hàng mới nhất</option>
                                    <option>Hàng cũ nhất</option>
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
                            {/* <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                <i class="fa-solid fa-chevron-left"></i>
                            </button> */}
                            <div class="container-page">
                                <p className="right-page">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </p>
                            </div>
                            {listPage.map((pageNumber) => (
                                <div class="container-page" key={pageNumber}>
                                    <p
                                        class={currentIndexPage === pageNumber ? 'page-number active' : 'page-number'}
                                        onClick={() => handleCurrentPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </p>
                                </div>
                            ))}
                            {/* <button onClick={handleNextPage} disabled={list.length === 0}>
                                <i class="fa-solid fa-chevron-right"></i>
                            </button> */}
                            <div class="container-page">
                                <p className="left-page">
                                    <i class="fa-solid fa-chevron-right"></i>
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
                                    <option>Mặc định</option>
                                    <option>A → Z</option>
                                    <option>Giá tăng dần</option>
                                    <option>Giá giảm dần</option>
                                    <option>Hàng mới nhất</option>
                                    <option>Hàng cũ nhất</option>
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
                                                                {item && item.price_reducing
                                                                    ? item.price_reducing.toLocaleString('vi', {
                                                                          style: 'currency',
                                                                          currency: 'VND',
                                                                      })
                                                                    : ''}
                                                            </p>

                                                            <span>
                                                                {item && item.price
                                                                    ? item.price.toLocaleString('vi', {
                                                                          style: 'currency',
                                                                          currency: 'VND',
                                                                      })
                                                                    : ''}
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
                            {/* <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                <i class="fa-solid fa-chevron-left"></i>
                            </button> */}
                            <div class="container-page">
                                <p className="right-page">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </p>
                            </div>
                            {listPage.map((pageNumber) => (
                                <div class="container-page" key={pageNumber}>
                                    <p
                                        class={currentIndexPage === pageNumber ? 'page-number active' : 'page-number'}
                                        onClick={() => setCurrentIndexPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </p>
                                </div>
                            ))}
                            {/* <button onClick={handleNextPage} disabled={list.length === 0}>
                                <i class="fa-solid fa-chevron-right"></i>
                            </button> */}
                            <div class="container-page">
                                <p className="left-page">
                                    <i class="fa-solid fa-chevron-right"></i>
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
                                <select id="cars" name="cars" onChange={handleSortChange} value={sortBy}>
                                    <option value="default">Mặc định</option>
                                    <option value="a-to-z">A → Z</option>
                                    <option value="price-ascending">Giá tăng dần</option>
                                    <option value="price-descending">Giá giảm dần</option>
                                    <option value="latest">Hàng mới nhất</option>
                                    <option value="oldest">Hàng cũ nhất</option>
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
                                                                {item && item.price_reducing
                                                                    ? item.price_reducing.toLocaleString('vi', {
                                                                          style: 'currency',
                                                                          currency: 'VND',
                                                                      })
                                                                    : ''}
                                                            </p>

                                                            <span>
                                                                {item && item.price
                                                                    ? item.price.toLocaleString('vi', {
                                                                          style: 'currency',
                                                                          currency: 'VND',
                                                                      })
                                                                    : ''}
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
                            {/* <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                <i class="fa-solid fa-chevron-left"></i>
                            </button> */}
                            <div class="container-page" onClick={handlePreviousPage}>
                                <p className="right-page">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </p>
                            </div>
                            {listPage.map((pageNumber) => (
                                <div class="container-page" key={pageNumber}>
                                    <p
                                        class={currentIndexPage === pageNumber ? 'page-number active' : 'page-number'}
                                        onClick={() => {
                                            setCurrentIndexPage(pageNumber);
                                            handleCurrentPage(pageNumber);
                                        }}
                                    >
                                        {pageNumber}
                                    </p>
                                </div>
                            ))}
                            {/* <button onClick={handleNextPage} disabled={list.length === 0}>
                                <i class="fa-solid fa-chevron-right"></i>
                            </button> */}
                            <div class="container-page" onClick={handleNextPage} disabled={list.length === 0}>
                                <p className="left-page">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
