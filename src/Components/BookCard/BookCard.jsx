import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../api/base';
import './BookCard.scss';

export default function BookCard(props) {
    return (
        <div className="main-list-item" key={props.key}>
            <Link to={`/book/detail/${props.link}`}>
                <div className="main-discription mt-8 mb-8">
                    <div className="cover-img-product">
                        <img
                            src={`${config.PUBLIC_IMAGE_URL}${props.images}`}
                            alt=""
                            className="avatar-image-product"
                        />
                        <div className="promotion-percentent-circle">
                            <span className="detail-number-percent">-{props.percentage}%</span>
                        </div>
                    </div>
                    <p className="item-desp">
                        {props && props?.name_product.length > 38
                            ? props.name_product.substring(0, 38) + '...'
                            : props.name_product}
                    </p>
                </div>
                <div className="main-price">
                    <p>
                        {props && props.price_reducing
                            ? props.price_reducing.toLocaleString('vi', {
                                  style: 'currency',
                                  currency: 'VND',
                              })
                            : ''}
                    </p>

                    <span>
                        {props && props.price
                            ? props.price.toLocaleString('vi', {
                                  style: 'currency',
                                  currency: 'VND',
                              })
                            : ''}
                    </span>
                </div>
                <div className="main-rate">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                </div>
            </Link>
        </div>
    );
}
