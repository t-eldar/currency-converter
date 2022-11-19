import { createCurrenciesUnion, createInputPattern, round } from "../utilities";

export default class CurrencyService {
  static BASE_URL = 'https://api.exchangerate.host/'
  static baseCurrency = 'EUR'
  /** 
   * @returns {Array} [{ description: 'currency full name', code: 'code' }, ...]
   */
  static async getCurrencies() {
    const response = await fetch(this.BASE_URL + "symbols", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const currencies = await response.json()
    const result = Object.values(currencies.symbols)
    return result
  }
  /**
   * @param {string} convertingString 
   * @returns {number} converting result
   */
  static async convertFromString(convertingString) {
    const currencies = await this.getCurrencies()
    const currenciesUnion = createCurrenciesUnion(currencies)
    const pattern = createInputPattern(currencies)
    if (!pattern.test(convertingString)) {
      throw new Error("Converting string does not match the pattern")
    }
    const amount = convertingString.match(/(\d*|\d*.\d*)/)
    const matches = convertingString.match(new RegExp(`(${currenciesUnion})`, 'gi'))
    const from = matches[0]
    const to = matches[1]

    const url = new URL(this.BASE_URL + "convert")
    url.searchParams.append('from', from)
    url.searchParams.append('to', to)
    url.searchParams.append('amount', amount)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return (await response.json()).result
  }
  /**
   * @param {string} baseCurrency currency's code
   * @returns {Array} [{code: 'code', rate: 'rate'}, {...}]
   */
  static async getLatestRates (baseCurrency) {
    const url = new URL(this.BASE_URL + "latest")
    url.searchParams.append('base', baseCurrency)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const rates = (await response.json()).rates
    const result = []
    for (let key in rates) {
      result.push({code: key, rate: round(1 / rates[key], 4)})
    }
    return result
  }
}