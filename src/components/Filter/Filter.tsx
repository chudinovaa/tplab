import React, {useEffect} from 'react';
import Search from '../Search/Search';
import s from './Filter.module.scss'
import {FaSortAmountDownAlt} from 'react-icons/fa';
import {useSearchParams} from 'react-router-dom';
import { sortType} from '../../store/productSlice';
const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''
    const sortQuery = searchParams.get('sort') || ''

    //Меняем тип сортировки
    const changeSort = (sort: sortType, num: number) => {
        setSearchParams({sort: sort, search: searchQuery})
    }



    return (
    <div className={s.wrapper}>
        <div className={s.container}>
            <div className={s.group}>
                <div>Сортировать:</div>
                <div className={s.sort}>
                    <div className={sortQuery === 'name' ? s.active : ''} onClick={() => changeSort('name', 0)}>по названию <FaSortAmountDownAlt/></div>
                    <div className={sortQuery === 'views' ? s.active : ''} onClick={() => changeSort('views', 1)}>по просмотрам</div>
                    <div className={sortQuery === 'start_date' ? s.active : ''} onClick={() => changeSort('start_date', 2)}>по дате начала</div>
                    <div className={sortQuery === 'end_date' ? s.active : ''} onClick={() => changeSort('end_date', 3)}>по дате окончания</div>
                </div>
            </div>
            <Search/>
        </div>

    </div>
    );
};

export default Filter;