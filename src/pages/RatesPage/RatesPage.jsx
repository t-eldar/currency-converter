import React, { useEffect, useState } from 'react'
import CurrencyService from '../../api/currencyService'
import RatesList from '../../components/RatesList'
import styles from './RatesPage.module.css'

const RatesPage = ({ currencies }) => {
  const [rates, setRates] = useState([])
  const [selectedBase, setSelectedBase] = useState(CurrencyService.baseCurrency)
  useEffect(() => {
    (async () => {
      const fetched = await CurrencyService.getLatestRates(selectedBase)
      setRates(fetched)
    })()
  }, [selectedBase])
  return (
    <>
      <div className={styles.container}>
        <div className={styles.baseCurrency}>
          Базовая валюта:
        </div>
        <select className={styles.select}
          value={selectedBase}
          onChange={e => setSelectedBase(e.target.value)}
        >
          {currencies.map((cur, index) =>
            <option key={index}>
              {cur.code}
            </option>)}
        </select>
      </div>
      <RatesList rates={rates} />
    </>
  )
}

export default RatesPage