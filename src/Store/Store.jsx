import { useState, useEffect } from 'react'
import styles from "./store.module.css"
import Header from '../Home/Header.jsx'
import Footer from '../Home/Footer.jsx'
import Card from './Card.jsx'
import Cart from '../Cart/Cart.jsx'


function Store({testItems} = []) {

    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    // console.log(cart)
    // console.log(testItems)


    const handleToggleCart = () => {
        if (showCart)
            setShowCart(false)
        else
            setShowCart(true)
    }

    const handleCountChange = (id, number) => {
        let newItems = [...items]
        newItems.forEach(item => {
            if (item.id === id) item.count += number;
            if (item.count < 0) item.count = 0;
        })
        setItems(newItems)
    }

    const handleCartCountChange = (id, number) => {
        let newCartItems = [...cart]
        newCartItems.forEach(item => {
            if (item.id === id) item.count += number;
        })
        newCartItems = newCartItems.filter(item => item.count > 0)
        setCart(newCartItems)
        localStorage.setItem('cart', JSON.stringify(newCartItems));
    }

    const handleAddToCart = (id) => {
        let storeItem = items.find(x => x.id === id)
        if (storeItem.count === 0) return;
        let newCart = [...cart]
        let cartItem = newCart.find(x => x.id === id)
        if (cartItem) {
            //already in the cart, just + the count, then update cart
            cartItem.count += storeItem.count
        } else {
            // console.log("new item")
            newCart.push({ ...storeItem }) // deep copy as obj
        }
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart));
    }
    
    useEffect(() => {
        
        // --jest testing only---
        if(testItems && testItems.length > 0) {
            // console.log(testItems)

            testItems = testItems.map(x => {
                return {
                    ...x,
                    count: 0
                }
            });
            setItems(testItems)
            return
        } 
        // --jest testing only---

        // get database of store items
        fetch(`https://fakestoreapi.com/products/category/women's clothing/`)
            .then(res => res.json())
            .then(res => {
                // console.log(res)

                // add property of count = 0 into each item.
                res = res.map(x => {
                    return {
                        ...x,
                        count: 0
                    }
                });

                setItems(res);
            })

        // get history cart 
        const oldCart = JSON.parse(localStorage.getItem('cart'));
        if (oldCart) {
            setCart(oldCart)
        }

    }, []);

    // console.log(items)

    return (
        <div className={styles.container}>
            <Header cart={cart} currentPage={"store"} handleToggleCart={handleToggleCart} />
            <div className={styles.panel}>
                {items.map(item => <Card key={item.id} item={item} onChange={handleCountChange} addToCart={handleAddToCart} />)}
            </div>
            {showCart && <Cart cart={cart}
                handleToggleCart={handleToggleCart}
                handleCartCountChange={handleCartCountChange}
            />
            }
            <Footer />

        </div>
    )
}

export default Store
