// Вывод количества звезд в зависимости от оценки в разделе product.stars
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';

export const starsMaker = (stars: number) => {
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