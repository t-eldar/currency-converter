import React, { useState } from 'react'
import styles from './ConvertInput.module.css'

const ConvertInput = ({
  inputPattern,
  value, setValue,
  valid, setValid,
  ...rest }) => {
  return (
    <input name="main"
      className={styles.input}
      type='text'
      placeholder='5 USD in RUB'
      onChange={e => {
        setValue(e.target.value)
        setValid(inputPattern.test(e.target.value))
      }}
      value={value ? value : ''}
      {...rest}
    />
  )
}
export default ConvertInput