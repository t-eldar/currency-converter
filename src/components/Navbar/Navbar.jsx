import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
const Navbar = ({ pages }) => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState()

  return (
    <ul className={styles.navbar}>
      {pages.map((page, index) =>
        <li key={index}
          onClick={() => {
            navigate(page.path)
            setSelected(page.id)
          }}
          className={selected === page.id ? styles.selected : ''}
        >
          <img className={styles.icon}
            src={page.icon}
          />
          {page.name}
        </li>)}
    </ul>
  )
}

export default Navbar