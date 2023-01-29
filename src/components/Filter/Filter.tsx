import React from 'react';
import Search from '../Search/Search';
import s from './Filter.module.scss'
import {FaSortAmountDownAlt} from 'react-icons/fa';
const Filter = () => {
    return (
    <div className={s.wrapper}>
        <div className={s.container}>
            <div className={s.group}>
                <div>Сортировать:</div>
                <div>по названию <FaSortAmountDownAlt/></div>
                <div>по просмотрам</div>
                <div>по дате начала</div>
                <div>по дате окончания</div>
            </div>
            <Search/>
        </div>

    </div>
    );
};

export default Filter;