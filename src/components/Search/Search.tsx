import React, {useEffect, useState} from 'react';
import s from './Search.module.scss'
import {FaSearch} from 'react-icons/fa';
import {useAppSelector} from '../../hooks';
import {useSearchParams} from 'react-router-dom';

const Search = () => {
    const {list} = useAppSelector(state => state.products)
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''
    const [search, setSearch] = useState(searchQuery)

    useEffect(() => {
        if (!search) {
            setSearchParams({})
        }
    },[search])

    const onClickHandle = (e:React.FormEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }



    const onSubmitHandle = (event: React.SyntheticEvent) => {
        event.preventDefault()
        if (search) {
            setSearchParams({search})
        } else {
            setSearchParams({})
        }
    }

    return (
    <div className={s.wrapper}>
        <form autoComplete="off" onSubmit={onSubmitHandle}>
            <FaSearch className={s.logo}/>
            <input
            onChange={e => onClickHandle(e)}
            value={search}
            placeholder="Поиск..."
            type="search"
            name="search"/>
        </form>
    </div>
    );
};

export default Search;