/**
 * Определяет, присутствует ли шестнадцатеричное значение цвета.
 * Форма для ввода может быть #fff000 #f00
 *
 * @param   String  color   Шестнадцатеричные значения цвета
 * @return  Boolean
 */
export const isHexColor = (color: string) => {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-f]{6})$/
  return reg.test(color)
}

/**
 * RGB Значения цвета преобразуются в шестнадцатеричные значения цвета.
 * r, g и b должны быть в диапазоне [0, 255].
 *
 * @return  String          Похоже #ff00ff
 * @param r
 * @param g
 * @param b
 */
export const rgbToHex = (r: number, g: number, b: number) => {
  // tslint:disable-next-line:no-bitwise
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex
}

/**
 * Преобразуйте шестнадцатеричный цвет в его RGB-представление
 * @param {string} hex The color to transform
 * @returns RGB-представление переданного цвета
 */
export const hexToRGB = (hex: string, opacity?: number) => {
  let sHex = hex.toLowerCase()
  if (isHexColor(hex)) {
    if (sHex.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sHex.slice(i, i + 1).concat(sHex.slice(i, i + 1))
      }
      sHex = sColorNew
    }
    const sColorChange: number[] = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sHex.slice(i, i + 2)))
    }
    return opacity
      ? 'RGBA(' + sColorChange.join(',') + ',' + opacity + ')'
      : 'RGB(' + sColorChange.join(',') + ')'
  }
  return sHex
}

export const colorIsDark = (color: string) => {
  if (!isHexColor(color)) return
  const [r, g, b] = hexToRGB(color)
    .replace(/(?:\(|\)|rgb|RGB)*/g, '')
    .split(',')
    .map((item) => Number(item))
  return r * 0.299 + g * 0.578 + b * 0.114 < 192
}

/**
 * Затемняет шестнадцатеричный цвет с учетом переданного процента
 * @param {string} color Цвет для обработки
 * @param {number} amount The amount to change the color by
 * @returns {string} Шестнадцатеричное представление обработанного цвета
 */
export const darken = (color: string, amount: number) => {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(
    color.substring(2, 4),
    amount
  )}${subtractLight(color.substring(4, 6), amount)}`
}

/**
 * Осветляет шестнадцатеричный цвет на 6 символов в соответствии с переданным процентом
 * @param {string} color The color to change
 * @param {number} amount Количество, на которое можно изменить цвет
 * @returns {string} Обработанный цвет представлен в виде шестнадцатеричного
 */
export const lighten = (color: string, amount: number) => {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`
}

/* Suma el porcentaje indicado a un color (RR, GG o BB) hexadecimal para aclararlo */
/**
 * Суммирует переданный процент с R, G или B шестнадцатеричного цвета
 * @param {string} color Цвет, который нужно изменить
 * @param {number} amount Количество, на которое можно изменить цвет
 * @returns {string} Обработанная часть цвета
 */
const addLight = (color: string, amount: number) => {
  const cc = parseInt(color, 16) + amount
  const c = cc > 255 ? 255 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * Вычисляет яркость цвета rgb
 * @param {number} r red
 * @param {number} g green
 * @param {number} b blue
 */
const luminanace = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

/**
 * Вычисляет контраст между двумя цветами rgb
 * @param {string} rgb1 rgb color 1
 * @param {string} rgb2 rgb color 2
 */
const contrast = (rgb1: string[], rgb2: number[]) => {
  return (
    (luminanace(~~rgb1[0], ~~rgb1[1], ~~rgb1[2]) + 0.05) /
    (luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05)
  )
}

/**
 * Определяет наилучший цвет текста (черный или белый) на основе контраста с фоном
 * @param hexColor - Последний выбранный пользователем цвет
 */
export const calculateBestTextColor = (hexColor: string) => {
  const rgbColor = hexToRGB(hexColor.substring(1))
  const contrastWithBlack = contrast(rgbColor.split(','), [0, 0, 0])

  return contrastWithBlack >= 12 ? '#000000' : '#FFFFFF'
}

/**
 * Вычитает указанный процент из R, G или B шестнадцатеричного цвета
 * @param {string} color Цвет, который нужно изменить
 * @param {number} amount Количество, на которое можно изменить цвет
 * @returns {string} Обработанная часть цвета
 */
const subtractLight = (color: string, amount: number) => {
  const cc = parseInt(color, 16) - amount
  const c = cc < 0 ? 0 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}
