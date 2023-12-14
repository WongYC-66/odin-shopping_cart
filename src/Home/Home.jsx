import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import styles from "./home.module.css"
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ClosePhoto from './closet.webp';
import Cart from '../Cart/Cart.jsx'


function Home() {

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const navigate = useNavigate();
  const navigateToStore = () => {
    // 👇️ navigate to /store
    navigate('/store');
  };

  const handleToggleCart = () => {
    if (showCart)
      setShowCart(false)
    else
      setShowCart(true)
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

  useEffect(() => {
    // get history cart 
    const oldCart = JSON.parse(localStorage.getItem('cart'));
    if (oldCart) {
      setCart(oldCart)
    }
  }, []);

  return (
    <div className={styles.container}>
      <Header cart={cart} currentPage={"home"} handleToggleCart={handleToggleCart} />

      <main>
        <img src={ClosePhoto} alt="closetPhoto" />
        <h1 id="title">THE LONG WEEKEND SALE</h1>
        <h2>{`Fashion Clothes - Q'3`}</h2>
        <p>Grab it while stock last</p>
        <button onClick={navigateToStore}>SHOP NOW</button>
      </main>

      {showCart && <Cart cart={cart}
        handleToggleCart={handleToggleCart}
        handleCartCountChange={handleCartCountChange}
      />
      }

      <Footer />
    </div>
  )
}

export default Home
