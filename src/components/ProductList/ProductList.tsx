import React from 'react';
import s from './ProductList.module.scss'
import ProductItem from '../ProductItem/ProductItem';
import {useAppSelector} from '../../hooks';
import {Link, useSearchParams} from 'react-router-dom';
import {IProduct} from '../../models/models';
const ProductList = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''
    const sortQuery = searchParams.get('sort') || ''
    const {loading, error, list} = useAppSelector(state => state.products)


    const sortByType = (arr: IProduct[] ,sort: string) => {
        if (sort === 'name') {
            return  arr.sort((a, b) => a.name > b.name ? 1 : -1)
        }
        else if (sort === 'views') {
            return  arr.sort((a, b) => a.views < b.views ? 1 : -1)
        }
        else if (sort === 'start_date') {
            return  arr.sort((a, b) => {
                const data1 = Date.parse(a.start_date.replace(/\//g, "-"))
                const data2 = Date.parse(b.start_date.replace(/\//g, "-"))
                return data1 - data2}
            )
        }
        else {
            return  arr.sort((a, b) => {
                const data1 = Date.parse(a.end_date.replace(/\//g, "-"))
                const data2 = Date.parse(b.end_date.replace(/\//g, "-"))
                return data1 - data2})
        }
    }

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
            {list &&
            sortByType(list.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())),
            sortQuery)
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