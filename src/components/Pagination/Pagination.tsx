import React, {useEffect, useState} from 'react';
import s from './Pagination.module.scss'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setCurrentPage, setItemsCount} from '../../store/productSlice';
const Pagination = () => {
    const {itemsCount,perPage,currentPage} = useAppSelector(state => state.products)
    const dispatch = useAppDispatch()
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        dispatch(setItemsCount(0))
    },[])

    useEffect(() => {
        setTotalPages(Math.ceil(itemsCount/perPage))
    },[itemsCount])

    console.log('itemsCount', itemsCount)
    console.log('perPage', perPage)
    console.log('currentPage', currentPage)
    console.log('totalPages', totalPages)

    function createButtons(num: number) {
        let buttons = [];
        for (let i = 1; i < num+1; i++) {
            buttons.push(<button
            onClick={() => dispatch(setCurrentPage(i))}
            className={currentPage === i ? s.active : ''}
            key={i}
            >
                {i}
            </button>
            );
        }
        return buttons;
    }

    const switchPage = (num: 1 | -1) => {
        if (num === -1 && currentPage > 1 || num === 1 && currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + num))
        }
    }

    return (
    <div className={s.wrapper}>
        <button onClick={() => switchPage(-1)}><FaChevronLeft/></button>
            {totalPages && createButtons(totalPages)}
        <button onClick={() => switchPage(1)}><FaChevronRight/></button>
    </div>
    );
};

export default Pagination;