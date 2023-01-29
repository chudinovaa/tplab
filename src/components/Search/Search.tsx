import React from 'react';
import s from './Search.module.scss'
import {FaSearch} from 'react-icons/fa';
const Search = () => {
    return (
    <div className={s.wrapper}>
        <FaSearch className={s.logo}/>
        <input
        placeholder="Поиск..."
        type="text"/>
    </div>
    );
};

export default Search;