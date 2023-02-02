//Создаем массив кнопок из количества страниц
import {setCurrentPage} from '../../store/productSlice';
import styles from '../../components/Pagination/Pagination.module.scss';
import React from 'react';

type CreateButtonsProps = {
  totalPages: number,
  currentPage: number,
  onClick: void,

}

export const createButtons = (props: CreateButtonsProps) => {
  let buttons = [];
  for (let i = 1; i < props.totalPages + 1; i++) {
    buttons.push(<button
        onClick={() => props.onClick}
        className={props.currentPage === i ? styles.active : ''}
        key={i}
      >
        {i}
      </button>
    );
  }
  return buttons;
}