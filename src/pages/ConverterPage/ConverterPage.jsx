import React, { useEffect, useState } from 'react'
import CurrencyService from '../../api/currencyService'
import ConvertInput from '../../components/ConvertInput/ConvertInput'
import { createInputPattern } from '../../utilities'
import styles from './ConvertPage.module.css'

const ConverterPage = ({ currencies }) => {

  const [inputPattern, setInputPattern] = useState('')
  const [value, setValue] = useState()
  const [valid, setValid] = useState(false)
  const [result, setResult] = useState(0)

  useEffect(() => {
    setInputPattern(createInputPattern(currencies))
  }, [currencies])
  const convert = () => {
    (async () => {
      const converted = await CurrencyService.convertFromString(value)
      setResult(converted)
    })()
  }

  return (
    <div className={styles.container}>
        <ConvertInput
          inputPattern={inputPattern}
          value={value} setValue={setValue}
          valid={valid} setValid={setValid}
        />
        <button
          onClick={convert}
          disabled={!valid}
          className={styles.button}
        >
          =
        </button>
        <div className={styles.result}>{result}</div>
    </div>
  )
}

export default ConverterPage