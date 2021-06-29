export function currency (num) {
  const n = parseInt(num, 10)
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`
}

export function date (time) {
  // 將本地當下的時間搓進行輸出
  const localDate = new Date(time * 1000)
  return localDate.toLocaleDateString()
}

// //  分解版本
// export function date (time) {
//     //先拆分年、月、日
//     const dateTime = new Date(time * 1000)
//     const year = dateTime.getFullYear()
//     const month = dateTime.getMonth()
//     const day = dateTime.getDay()
//     const dateFull = `${year}/${month}/${day}`
//     return dateFull
//   }
