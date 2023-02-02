import React from 'react';
import styles from './ContentCards.module.scss'
import {ProductList} from '../ProductList/ProductList';
import {Pagination} from '../Pagination/Pagination';
import {Filter} from '../Filter/Filter';

export const ContentCards = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <p>Карточки контента</p>
        <Filter/>
        <Pagination/>
        <ProductList/>
      </div>
    </div>

  );
};
