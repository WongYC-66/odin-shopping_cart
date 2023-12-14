import { Link } from "react-router-dom";
import styles from "./header.module.css"
import StoreLogo from './store-solid.svg';
import UserLogo from './user-solid.svg';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function Header({ cart = [] , currentPage="home", handleToggleCart}) {
  // console.log(items)
  // console.log(currentPage)
  const loginClick = () => {
    console.log(currentPage)
    if(currentPage === 'home')
      alert('Please go to store page first.')
    else
      alert('Login feature under construction.')
  }

  let total = 0;
  if (cart.length > 0) {
    total = cart.map(x => x.count).reduce((x, sum) => x + sum, 0);
  }

  return (
    <header >
      <h1>YUMEKO</h1>
      <div className={styles.navBar}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/store">Store</Link></li>
      </div>
      <div className={styles.icon}>
        <div className={styles.cartIcon}>
          <img src={StoreLogo} alt="StoreLogo" onClick={handleToggleCart}/>
          {cart.length > 0 ? <div title="cartCount" className={styles.count}>{total}</div> : ''}
        </div>
        <img src={UserLogo} alt="UserLogo" onClick = {loginClick} />
      </div>
    </header>
  )
}

export default Header
