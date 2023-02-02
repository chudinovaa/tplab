import React, {useEffect, useState} from 'react';
import styles from './Search.module.scss'
import {FaSearch} from 'react-icons/fa';
import {useSearchParams} from 'react-router-dom';
import {setCurrentPage} from '../../store/productSlice';
import {useAppDispatch} from '../../hooks/hooks';

export const Search = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const sortQuery = searchParams.get('sort') || ''
  const [search, setSearch] = useState(searchQuery)

  useEffect(() => {
    setSearchParams({sort: sortQuery || 'name', search: search})
  }, [])

  useEffect(() => {
    if (!search && searchQuery) {
      setSearchParams({sort: sortQuery, search: search})
    }

  })

  const onChangeHandle = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }


  const onSubmitHandle = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setSearchParams({sort: sortQuery, search: search})
    dispatch(setCurrentPage(1))
  }

  return (
    <div className={styles.wrapper}>
      <form autoComplete="off" onSubmit={onSubmitHandle}>
        <FaSearch className={styles.logo}/>
        <input
          onChange={e => onChangeHandle(e)}
          value={search}
          placeholder="Поиск..."
          type="search"
          name="search"/>
      </form>
    </div>
  );
};