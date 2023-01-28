import React from 'react';
import s from './ContentItem.module.scss'
import {FaChevronLeft} from 'react-icons/fa';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';

const ContentItem = () => {

    const priceSlicer = (count: string|number, part: 0|1) => {
        if (typeof count === 'number') {
            return count.toString().split('.')[part]
        } else {
            return count.split(',')[part]
        }
    }
    const product = {
            "name": "Сухой корм для взрослых собак мелких и карликовых пород",
            "image_url": "https:\/\/4lapy.ru\/resize\/800x800\/upload\/iblock\/714\/7140b69c9d49dd89f1d35b1a99e27d18.jpg",
            "logo_url": "https:\/\/myzoograd.ru\/upload\/iblock\/f37\/f3733a014d377f291a8d6968badaca27.jpg",
            "category": "Корм для животных",
            "views": 12000,
            "start_date": "2\/22\/2022",
            "end_date": "8\/22\/2023",
            "discount": "0",
            "stars": 0,
            "old_price": "555,99",
            "new_price": "555,99",
            "disclaimer": "Ваша собака будет счастлива"
        }


    return (
    <div className={s.wrapper}>
        <div className={s.container}>
            <div className={s.back}><FaChevronLeft/> Назад</div>
            <div className={s.content}>

                <div className={s.header}>
                    <div className={s.discount}>{product.discount}</div>
                    <div className={s.logo}>
                        <img src={product.logo_url} alt={product.name}/>
                    </div>
                </div>
                <div className={s.content_body}>
                    <div className={s.picture}><img src={product.image_url} alt=""/></div>
                    <div className={s.name_group}>
                        <div className={s.name}>{product.name}</div>
                        <div className={s.price_group}>
                            <div className={s.price_group_old}>
                                <div className={s.price_old}>
                                    <div className={s.rubles}>{priceSlicer(product.old_price,0)}</div>
                                    <div className={s.penny}>{priceSlicer(product.old_price,1)}</div>
                                    ₽
                                </div>
                                <div className={s.line}></div>
                                <div className={s.description_old}>
                                    СТАРАЯ ЦЕНА
                                </div>
                            </div>
                            <div className={s.price_group_new}>
                                <div className={s.price_stars}>
                                    <AiFillStar/>
                                    <AiFillStar/>
                                    <AiFillStar/>
                                    <AiFillStar/>
                                    <AiFillStar/>
                                </div>
                                <div className={s.price_new}>
                                    {product.new_price}₽
                                </div>
                                <div className={s.description_new}>
                                    ЦЕНА ПО АКЦИИ
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div>
                    disclamer
                </div>






            </div>
        </div>

    </div>
    );
};

export default ContentItem;