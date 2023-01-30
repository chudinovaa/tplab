import React, {useEffect, useState} from 'react';
import s from './Search.module.scss'
import {FaSearch} from 'react-icons/fa';
import {useSearchParams} from 'react-router-dom';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''
    const sortQuery = searchParams.get('sort') || ''
    const [search, setSearch] = useState(searchQuery)

    useEffect(() => {
        setSearchParams({sort: sortQuery || 'name', search: search})
    }, [])

    const onChangeHandle = (e: React.FormEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }

    useEffect(() => {
        if (!search && searchQuery) {
            setSearchParams({sort: sortQuery, search: search})
        }
    })


    const onSubmitHandle = (event: React.SyntheticEvent) => {
        event.preventDefault()
        setSearchParams({sort: sortQuery, search: search})

    }

    return (
    <div className={s.wrapper}>
        <form autoComplete="off" onSubmit={onSubmitHandle}>
            <FaSearch className={s.logo}/>
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

export default Search;