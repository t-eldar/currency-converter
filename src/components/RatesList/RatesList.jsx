import React, { useEffect, useState } from 'react'
import styles from './RatesList.module.css'

const RatesList = ({ rates }) => {
  const [lists, setLists] = useState([[]])
  useEffect(() => {
    const half = Math.floor(rates.length / 2)
    setLists([
      rates.slice(0, half),
      rates.slice(half, rates.length),
    ])
  }, [rates])


  return (
    <div className={styles.lists}>
      {lists.map((list, index) =>
        <ul key={index} className={styles.list}>
          {list.map((rate, index) =>
            <li key={index}>
              <div className={styles.code}>
                {rate.code}
              </div>
              <div className={styles.rate}>
                {rate.rate}
              </div>
            </li>)}
        </ul>)}
    </div>
  )
}

export default RatesList