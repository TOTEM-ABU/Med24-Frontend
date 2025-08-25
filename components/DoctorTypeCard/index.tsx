import React from 'react'
import styles from "./DoctorTypeCard.module.css"

interface DoctorTypeCardProps {
    name: string
    image: string
    className?: string
}

const DoctorTypeCard = ({ name, image, className }: DoctorTypeCardProps) => {
  return (
    <div className={`${styles['card']} ${className || ''}`}>
        <p className={styles['name']}>{name}</p>
        <img src={image} alt={`${name} icon`} className={styles['image']}/>
    </div>
  )
}


export default DoctorTypeCard