// import { useState, useEffect } from 'react'
import styles from './card.module.css'

function Card({ item, onChange, addToCart }) {
    // console.log(onChange)

    return (
        <div className={styles.card}>
            <img src={item.image} alt={item.title} />
            <h5>{item.title}</h5>
            <h4>{item.price} $</h4>
            <div className={styles.cardControl}>
                <button className = {styles.minusBtn} onClick={() => onChange(item.id, -1)}>-</button>
                <div className = {styles.countText}>{item.count}</div>
                <button className = {styles.plusBtn} onClick={() => onChange(item.id, +1)}>+</button>
                <button className = {styles.addToCartBtn} onClick={() => addToCart(item.id)}>Add to Cart</button>
            </div>
        </div>
    )
}

export default Card
