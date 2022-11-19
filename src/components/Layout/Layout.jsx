import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import styles from './Layout.module.css'

const Layout = ({ pages }) => {
  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <Navbar pages={pages} />
        </div>
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout