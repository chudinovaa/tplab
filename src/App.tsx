import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductItemPage from './pages/ProductItemPage';
import {useAppDispatch} from './hooks';
import {fetchProducts} from './store/productSlice';

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    },[])

    return (
    <Routes>
        <Route path="/" element={<ProductsPage/>} />
        <Route path="/:name" element={<ProductItemPage/>} />
    </Routes>
  );
}

export default App;
