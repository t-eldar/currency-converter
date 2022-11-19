export const createCurrenciesUnion = (currencies) => {
  const result = []
  for (let currency of currencies) {
    result.push(currency.code)
  }
  return result.join('|')
}
export const createInputPattern = (currencies) => {
  const currenciesUnion = createCurrenciesUnion(currencies)
  return new RegExp(`(\d*|\d*.\d*) (${currenciesUnion}) IN (${currenciesUnion})`, 'i')
}
export const round = (number, precisionDigits) => {
  const temp = Math.pow(10, precisionDigits)
  return Math.round(number * temp) / temp
}