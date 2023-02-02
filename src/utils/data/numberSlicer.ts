//Разделяет число на 2 части до точки и после, если число целое дописывает нули
export const numberSlicer = (count: number, part: 0 | 1) => {
    return count.toFixed(2).split('.')[part]
}
