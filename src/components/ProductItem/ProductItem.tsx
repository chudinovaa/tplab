import React from 'react';
import {IProduct} from '../../models/models';
import styles from './ProductItem.module.scss'


const ProductItem = (product: IProduct) => {

    return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.group}>
                <div className={styles.logo}><img src={product.logo_url} alt={product.name}/></div>
                <div>
                    <div className={styles.name}>{product.name}</div>
                    <div className={styles.category}>{product.category}</div>
                </div>
            </div>
            <div className={styles.group}>
                <div className={styles.views}>{product.views}</div>
                <div className={styles.start}>{new Date(product.start_date).toLocaleDateString()}</div>
                <div className={styles.end}>{new Date(product.end_date).toLocaleDateString()}</div>
            </div>
        </div>
    </div>
    );
};

export {ProductItem};