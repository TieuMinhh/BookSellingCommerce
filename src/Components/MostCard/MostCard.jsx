import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../api/base';
import './MostCard.scss';

export default function MostCard(props) {
    return (
        <>
            <Link to={`/book/detail/${props.link}`} key={props.key}>
                <div className="item-book-trend">
                    <div className="cover-img-trend">
                        <img
                            loading="lazy"
                            src={`${config.PUBLIC_IMAGE_URL}${props.images}`}
                            alt=""
                            className="avatar-image"
                            style={{ height: '100px' }}
                        />
                        <div className="promotion-corner-trend">
                            <span className="detail-promotion-trend">-{props && props?.percentage}%</span>
                        </div>
                    </div>
                    <p className="item-trend-name">{props && props?.name_product}</p>
                    <p className="item-trend-price">
                        {props &&
                            props?.price_reducing.toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                    </p>
                    <p className="item-price-old">
                        {props &&
                            props?.price.toLocaleString('vi', {
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
        </>
    );
}
