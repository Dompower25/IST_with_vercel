import styles from '../../styles/CartPage/CartPage.module.css'
import { useState, useEffect } from 'react'

export default function CartTotalSum({ quantity, price }) {
  const [MoreInfActive, setActive] = useState(false)

  const handlerClick = (e, state) => {
    setActive(!MoreInfActive)
    if (!state) {
      e.target.classList.add(`${styles.active}`)
    } else if (state && e.target.classList.contains(`${styles.active}`)) {
      e.target.classList.remove(`${styles.active}`)
    }
  }

  useEffect(() => {
    const moreActivator = document.querySelector(`.${styles.totalDescription}`)
    if (MoreInfActive) {
      moreActivator.classList.add(`${styles.active}`)
    } else {
      moreActivator.classList.remove(`${styles.active}`)
    }
  }, [MoreInfActive])

  return (
    <>
      <div className={styles.CartData}>
        <div className={styles.header}>
          <h1>Выбрано товаров</h1>
          <label>{quantity}</label>
          <button
            className={styles.MoreAboutOrder}
            onClick={(e) => handlerClick(e, MoreInfActive)}
          />
        </div>

        <div className={styles.TotalSum}>
          <div className={styles.totalDescription}>
            <div className={styles.TotalCol + ' ' + styles.TotalProducts}>
              <a>Товары({quantity}):</a>
              <a>{new Intl.NumberFormat('ru-RU').format(price)}₽</a>
            </div>
            {/* <div className={
                            styles.TotalCol + " " +
                            styles.TotalDiscount}>
                            <a>Скидка:</a>
                            <a>10 845₽</a>
                        </div> */}
          </div>
          <div className={styles.TotalFinalyBlock}>
            <p className={styles.TotalSum_FinSum}>
              Сумма: {new Intl.NumberFormat('ru-RU').format(price)}₽
            </p>

            <button className={styles.SendOrderBtn + ' ' + styles.disbled}>
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
