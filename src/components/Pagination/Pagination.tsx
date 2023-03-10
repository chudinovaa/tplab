import React, {useEffect, useState} from 'react';
import styles from './Pagination.module.scss'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setCurrentPage, setItemsCount} from '../../store/productSlice';
import {createButtons} from '../../utils/elements/createButtons,';

export const Pagination = () => {
  const {itemsCount, perPage, currentPage} = useAppSelector(state => state.products)
  const dispatch = useAppDispatch()
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    dispatch(setItemsCount(1))
  }, [])

  useEffect(() => {
    setTotalPages(Math.ceil(itemsCount / perPage))
  }, [itemsCount])

//Создаем массив кнопок из количества страниц
  function createButtons(num: number) {
    let buttons = [];
    for (let i = 1; i < num + 1; i++) {
      buttons.push(<button
          onClick={() => dispatch(setCurrentPage(i))}
          className={currentPage === i ? styles.active : ''}
          key={i}
        >
          {i}
        </button>
      );
    }
    return buttons;
  }

  //Переключаем страницы кнопками влево и вправо
  const switchPage = (num: 1 | -1) => {
    if (num === -1 && currentPage > 1 || num === 1 && currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + num))
    }
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={() => switchPage(-1)}><FaChevronLeft/></button>
      {totalPages && createButtons(totalPages)}
      {/*{totalPages && createButtons({totalPages, currentPage, })}*/}
      <button onClick={() => switchPage(1)}><FaChevronRight/></button>
    </div>
  );
};