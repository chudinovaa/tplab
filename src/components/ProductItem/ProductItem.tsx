import React from 'react';
import {IProduct} from '../../models/models';
import s from './ProductItem.module.scss'


const ProductItem = (product: IProduct) => {

    return (
    <div className={s.wrapper}>
        <div className={s.container}>
            <div className={s.group}>
                <div className={s.logo}><img src={product.logo_url} alt={product.name}/></div>
                <div>
                    <div className={s.name}>{product.name}</div>
                    <div className={s.category}>{product.category}</div>
                </div>
            </div>
            <div className={s.group}>
                <div className={s.views}>{product.views}</div>
                <div className={s.start}>{new Date(product.start_date).toLocaleDateString()}</div>
                <div className={s.end}>{new Date(product.end_date).toLocaleDateString()}</div>
            </div>
        </div>
    </div>
    );
};

export default ProductItem;