// Преобразует строку в число, возвращает число, либо 0
export const valueToNumber = (count: string | number | undefined | typeof NaN) => {
  if (typeof count === 'number') {
    return count
  } else if (typeof count === 'string') {
    return Number(count?.replace(/,/g, "."))
  } else {
    return 0
  }
}