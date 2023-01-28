import React from 'react';
import s from './ContentCards.module.scss'
import ProductList from '../ProductList/ProductList';
import Pagination from '../Pagination/Pagination';
import Filter from '../Filter/Filter';
const ContentCards = () => {
    return (
    <div className={s.wrapper}>
        <div className={s.content_wrapper}>
            <p>Карточки контента</p>
            <Filter/>
            <Pagination/>
            <ProductList/>
        </div>
    </div>

    );
};

export default ContentCards;