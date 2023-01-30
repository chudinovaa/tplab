import React from 'react';
import s from './ProductList.module.scss'
import ProductItem from '../ProductItem/ProductItem';
import {useAppSelector} from '../../hooks';
import {Link, useSearchParams} from 'react-router-dom';
const ProductList = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const searchQuery = searchParams.get('search') || ''


    const {loading, error, list} = useAppSelector(state => state.products)

    return (
    <div className={s.wrapper}>
        <div className={s.container}>
            <div className={s.table_header}>
                <div className={s.table_group}>
                    <div className={s.first}>Фото</div>
                    <div className={s.second}>Название</div>
                </div>
                <div className={s.table_group}>
                    <div className={s.third}>Просмотры</div>
                    <div className={s.forth}>Начало ротации</div>
                    <div className={s.fifth}>Конец ротации</div>
                </div>
            </div>
        </div>
        <div className={s.list}>
            {loading && <h2>Loading...</h2>}
            {error && <h2>An error occurred: {error}</h2>}
            {list && list.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(product =>
            <Link key={product.name} to={`/${product.name.replace(/[\/ ()]/g, "_")}`}>
            <ProductItem {...product} />
            </Link>)
            }
        </div>
    </div>
    );
};

export default ProductList;