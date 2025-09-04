import { Button, SearchBar } from '@/components'
import Input from '@/components/SearchBar'
import React from 'react'
import styles from './About.module.css';


const NotFoundPage = () => {
  return (
    <div className='container'>
   <div className={styles.inputContainer}>
            <Input
              label="Shifokor ismi, mutaxassislik nomini yoki xizmat turini kiriting"
              width="100%"
            />
            <Button name="Qidirish" variant="primary" padding="0 38px 0 38px" />
          </div>
    </div>
  )
}

export default NotFoundPage
