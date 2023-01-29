import React from 'react';
import s from './ContentItem.module.scss'
import {FaChevronLeft, FaRubleSign} from 'react-icons/fa';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';
import triangle from '../../assets/component_arrow.svg'
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks';


const ContentItem = () => {

    const {name} = useParams()
    const {list} = useAppSelector(state => state.products)
    const product = list.find(product => product.name.replace(/[\/ ()]/g, "_") === name)

    if (!product) {
        return <>
            <h1>Can't find the page {name}</h1>
            <h1><Link to='/'>Назад</Link></h1>
        </>
    }


    const starsMaker = (stars: number) => {
        const starsArray = []
        for (let i = 0; i < 5; i++) {
            if (stars > 0) {
                starsArray.push(<AiFillStar key={i}/>)
                stars--
            } else {
                starsArray.push(<AiOutlineStar key={i}/>)
            }
        }
        return starsArray
    }

    const priceSlicer = (count: string | number, part: 0 | 1) => {
        if (typeof count === 'number') {
            return count.toString().split('.')[part]
        } else {
            return count.split(',')[part]
        }
    }


    return (
    <div className={s.wrapper}>
        <div className={s.container}>
            <div className={s.back}>
                <Link to="/"><FaChevronLeft/>Назад</Link>
            </div>
            <div className={s.content}>

                <div className={s.header}>
                    {Number(product.discount) ? <div className={s.discount}>
                        <div className={s.rectangular}>-{product.discount}%</div>
                        <img src={triangle} alt="triangle"/>
                    </div> : <div></div>}
                    <div className={s.logo}>
                        <img src={product.logo_url} alt={product.name}/>
                    </div>
                </div>
                <div className={s.content_body}>
                    <div className={s.picture}><img src={product.image_url} alt=""/></div>
                    <div className={s.name_group}>
                        <div className={s.name}>{product.name}</div>
                        <div className={s.price_group}>
                            {product.old_price && product.new_price ?
                            <div className={s.price_group_old}>
                                <div className={s.price_old}>
                                    <div className={s.rubles}>{priceSlicer(product.old_price, 0)}</div>
                                    <div className={s.penny}>{priceSlicer(product.old_price, 1)}</div>
                                    <FaRubleSign/>
                                </div>
                                <div className={s.line}></div>
                                <div className={s.price_description}>
                                    СТАРАЯ ЦЕНА
                                </div>
                            </div>
                            : <div></div>}
                            <div className={s.price_group_new}>
                                <div className={s.price_stars}>
                                    {starsMaker(Number(product.stars))}
                                </div>
                                <div className={s.price_new}>
                                    <div
                                    className={s.rubles}>{priceSlicer(Number(product.new_price ? product.new_price : product.old_price), 0)}</div>
                                    <div
                                    className={s.penny}>{priceSlicer(Number(product.new_price ? product.new_price : product.old_price), 1)}</div>
                                    <FaRubleSign/>
                                </div>
                                {product.old_price && product.new_price ?
                                <div className={s.price_description}>
                                    ЦЕНА ПО АКЦИИ
                                </div> : <div className={s.price_description}></div>}
                            </div>
                        </div>
                    </div>
                </div>

                {product.disclaimer ?
                    <div className={s.disclaimer}>
                        {product.disclaimer}
                    </div> : <div className={s.disclaimer}></div>
                }
                <div className={s.mask}></div>

            </div>
        </div>

    </div>
    );
};

export default ContentItem;