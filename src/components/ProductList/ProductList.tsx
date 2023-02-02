import React, {useEffect} from 'react';
import styles from './ProductList.module.scss'
import {ProductItem} from '../ProductItem/ProductItem';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Link, useSearchParams} from 'react-router-dom';
import {IProduct} from '../../models/models';
import {setItemsCount} from '../../store/productSlice';

const ProductList = () => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''
    const sortQuery = searchParams.get('sort') || ''
    const {loading, error, list, currentPage, perPage} = useAppSelector(state => state.products)

//Ищем по именам в массиве
    const searchByName = (arr: IProduct[], search: string) => {
        return arr.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
    }

//Сортировка массива
    const sortByType = (arr: IProduct[], sort: string) => {
        if (sort === 'name') {
            return arr.sort((a, b) => a.name > b.name ? 1 : -1)
        } else if (sort === 'views') {
            return arr.sort((a, b) => a.views < b.views ? 1 : -1)
        } else if (sort === 'start_date') {
            return arr.sort((a, b) => {
                const data1 = Date.parse(a.start_date.replace(/\//g, "-"))
                const data2 = Date.parse(b.start_date.replace(/\//g, "-"))
                return data1 - data2
            }
            )
        } else {
            return arr.sort((a, b) => {
                const data1 = Date.parse(a.end_date.replace(/\//g, "-"))
                const data2 = Date.parse(b.end_date.replace(/\//g, "-"))
                return data1 - data2
            })
        }
    }

//Делим массив на страницы
    const pagination = (arr: IProduct[]) => {
        const start = perPage * (currentPage - 1)
        const end = perPage + start
        return arr.slice(start,end)
    }

//Получаем отсортированный массив + все совпадения поиска
    const sortedSearchedList = sortByType(searchByName(list, searchQuery), sortQuery)

    useEffect(() => {
        dispatch(setItemsCount(sortedSearchedList.length))
    },[sortedSearchedList])



    return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.table_header}>
                <div className={styles.table_group}>
                    <div className={styles.first}>Фото</div>
                    <div className={styles.second}>Название</div>
                </div>
                <div className={styles.table_group}>
                    <div className={styles.third}>Просмотры</div>
                    <div className={styles.forth}>Начало ротации</div>
                    <div className={styles.fifth}>Конец ротации</div>
                </div>
            </div>
        </div>
        <div className={styles.list}>
            {loading && <h2>Loading...</h2>}
            {error && <h2>An error occurred: {error}</h2>}
            {list && pagination(sortedSearchedList)
            .map(product =>
            <Link key={product.name} to={`/${product.name.replace(/[\/ ()]/g, "_")}`}>
                <ProductItem {...product} />
            </Link>)
            }
        </div>
    </div>
    );
};

export {ProductList};