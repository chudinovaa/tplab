import React from 'react';
import styles from './ContentItem.module.scss'
import {FaChevronLeft, FaRubleSign} from 'react-icons/fa';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';
import triangle from '../../assets/component_arrow.svg'
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks';


const ContentItem = () => {
    const navigate = useNavigate()
    const {name} = useParams()
    const {list} = useAppSelector(state => state.products)
    const product = list.find(product => product.name.replace(/[\/ ()]/g, "_") === name)

    // Если сделали неправильный поиск компонента - вывод ошибки и ссылка на главную страницу
    if (!product) {
        return <>
            <h1>Can't find the page {name}</h1>
            <h1><Link to='/'>Назад</Link></h1>
        </>
    }

    // Вывод количества звезд в зависимости от оценки в разделе product.stars
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

    // Преобразует строку в число, либо вернет число, либо вернет 0
    const valueToNumber = (count: string | number | undefined | typeof NaN) => {
        if (typeof count === 'number') {
            return count
        } else if (typeof count === 'string') {
            return Number(count?.replace(/,/g, "."))
        } else {
            return 0
        }
    }

    //Разделяет число на 2 части до точки и после, если число целое дописывает нули
    const priceSlicer = (count: number, part: 0 | 1) => {
        return count.toFixed(2).split('.')[part]
    }


    return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.back} onClick={() => navigate(-1)}>
                <span><FaChevronLeft/>Назад</span>
            </div>
            <div className={styles.content}>

                <div className={styles.header}>
                    {Number(product.discount) ? <div className={styles.discount}>
                        <div className={styles.rectangular}>-{product.discount}%</div>
                        <img src={triangle} alt="triangle"/>
                    </div> : <div></div>}
                    <div className={styles.logo}>
                        <img src={product.logo_url} alt={product.name}/>
                    </div>
                </div>
                <div className={styles.content_body}>
                    <div className={styles.picture}><img src={product.image_url} alt=""/></div>
                    <div className={styles.name_group}>
                        <div className={styles.name}>{product.name}</div>
                        <div className={styles.price_group}>
                            {product.old_price && product.new_price ?
                            <div className={styles.price_group_old}>
                                <div className={styles.price_old}>
                                    <div
                                    className={styles.rubles}>{priceSlicer(valueToNumber(product.old_price), 0)}</div>
                                    <div
                                    className={styles.penny}>{priceSlicer(valueToNumber(product.old_price), 1)}</div>
                                    <FaRubleSign/>
                                </div>
                                <div className={styles.line}></div>
                                <div className={styles.price_description}>
                                    СТАРАЯ ЦЕНА
                                </div>
                            </div>
                            : <div></div>}
                            <div className={styles.price_group_new}>
                                <div className={styles.price_stars}>
                                    {starsMaker(Number(product.stars))}
                                </div>
                                <div className={styles.price_new}>
                                    <div
                                    className={styles.rubles}>{priceSlicer(valueToNumber(product.new_price) ? valueToNumber(product.new_price) : valueToNumber(product.old_price), 0)}</div>
                                    <div
                                    className={styles.penny}>{priceSlicer(valueToNumber(product.new_price) ? valueToNumber(product.new_price) : valueToNumber(product.old_price), 1)}</div>
                                    <FaRubleSign/>
                                </div>
                                {product.old_price && product.new_price ?
                                <div className={styles.price_description}>
                                    ЦЕНА ПО АКЦИИ
                                </div> : <div className={styles.price_description}></div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.disclaimer}>
                    {product.disclaimer && product.disclaimer}
                </div>

                <div className={styles.mask}></div>

            </div>
        </div>

    </div>
    );
};

export {ContentItem}