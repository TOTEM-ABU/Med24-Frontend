import React from 'react'
import styles from "./ProductCard.module.css"

interface ProductCardProps {
  image: string
  price: string
  name: string
}

const ProductCard = ({ image, price, name }: ProductCardProps) => {
  return (
    <div className={styles['product-card-container']}>
      <a href="#" className={styles['link']}>
        <img src={image} alt={name} className={styles['image']} />
      </a>
      <p className={styles['price']}>{price} so'm</p>
      <p className={styles['name']}>{name}</p>
    </div>
  )
}

export default ProductCard
