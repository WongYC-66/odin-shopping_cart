import styles from "./cart.module.css"

function Cart({ cart, handleToggleCart, handleCartCountChange }) {
    console.log(cart)

    let totalPrice = cart.map(x => x.price * x.count).reduce((x, sum) => sum + x, 0).toFixed(2);

    const handleCheckoutClick = () => {
        alert("checkout api under construction")
    }

    return (
        <div className={styles.cart}>
            <h1>Shopping Cart<span onClick={handleToggleCart}>X</span></h1>
            <div className={styles.header}> 
                <p>No.</p>
                <p></p>
                <p>Item</p>
                <p>Unit Price</p>
                <p>SubTotal($)</p>
            </div>

            {cart.map((item, i) => {
                return (
                    <div key={i} className={styles.cartItem}>
                        <p>{i + 1}.</p>
                        <img src={item.image} alt="photo" />
                        <p className={styles.title}>{item.title}</p>
                        <p>
                            <span className={styles.button} onClick={()=>handleCartCountChange(item.id,-1)}>-</span>
                            <span className={styles.count}>{item.count}</span>
                            <span className={styles.button} onClick={()=>handleCartCountChange(item.id,+1)}>+</span>
                            <span className={styles.spanUnitPrice}>x {item.price}</span>
                        </p>
                        <p className={styles.subTotal}>{(item.count * item.price).toFixed(2)}</p>
                    </div>
                )
            })}
            <p className={styles.totalPrice}>Total : {totalPrice} $ </p>
            <button onClick={handleCheckoutClick}>Checkout</button>
        </div>
    )
}

export default Cart
