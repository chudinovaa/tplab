import React from 'react';
import s from './Pagination.module.scss'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
const Pagination = () => {
    return (
    <div className={s.wrapper}>
        <button><FaChevronLeft/></button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button><FaChevronRight/></button>
    </div>
    );
};

export default Pagination;