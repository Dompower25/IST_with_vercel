import { useQuery, useMutation } from 'react-query'
import setData from '../helpers/setData'
import { createCart, updateCart, getCart } from '../queries/cartMoves'
import { getData } from '../queries/getData'

export async function getCartItems() {
  let isSessionSet =
    typeof window !== 'undefined' &&
    localStorage.getItem('cart_session') !== null

  if (!isSessionSet) {
    return null
  } else {
    let BaseCart = []
    await getData(getCart, 'cartCollection_by_id', {
      id: localStorage.getItem('cart_session'),
    }).then((elem) => {
      if (elem) {
        BaseCart = elem.cart_model
      } else {
        BaseCart = null
        console.warn('getCartItems: session does not defined\n')
      }
    })
    return BaseCart
  }
}

export async function cartCreateAct(id, quantity, price) {
  let finResponse = null

  if (id && quantity && price) {
    let newCartItem = {
      status: 'draft',
      cart_model: [
        {
          product_id: id,
          quantity,
          price,
        },
      ],
    }

    let BaseCart = []
    BaseCart = await getCartItems()

    if (BaseCart === null) {
      await setData(createCart, { data: newCartItem }).then((response) => {
        localStorage.setItem(
          'cart_session',
          response.create_cartCollection_item.id,
        )
      })
      await cartCreateAct(id, quantity, price).then(
        (resp) => (finResponse = resp),
      )
    } else if (BaseCart !== null && BaseCart.length >= 0) {
      BaseCart.map(async (elem) => {
        if (elem) {
          if (elem.product_id !== id) {
            newCartItem.cart_model.push(elem)
          } else elem.quantity = quantity
        }
      })

      await setData(updateCart, {
        data: newCartItem,
        id: localStorage.getItem('cart_session'),
      }).then((response) => {
        finResponse = newCartItem ? newCartItem : null
      })
    }
  }

  return finResponse
}

export async function inCart(id) {
  let finRes = false

  let BaseCart = []
  BaseCart = await getCartItems()

  if (BaseCart && BaseCart.length > 0) {
    BaseCart.map((elem) => {
      if (elem) {
        if (elem.product_id === id) finRes = true
      } else {
        console.warn(BaseCart, 'inCart: Get cart items error')
        finRes = false
      }
    })
  } else finRes = false

  return finRes
}

export async function rmeoveItem(id) {
  let newCartItem = {
    status: 'draft',
    cart_model: [],
  }

  await getCartItems().then((elem) => {
    if (elem) {
      elem.map((product) => {
        if (product.product_id !== id) {
          let item = {
            product_id: product.product_id,
            quantity: product.quantity,
            price: product.price,
          }
          newCartItem.cart_model.push(item)
        }
      })
    }
  })

  // console.log(newCartItem);

  if (newCartItem) {
    await setData(updateCart, {
      data: newCartItem,
      id: localStorage.getItem('cart_session'),
    })
    return newCartItem
  } else return null
}
