import { ICartSelector, ICartSelector_type } from '../Abstract/ICartTypes'

export const switchSelectedState_cartActions = (
  currentQuantity: number,
  cartSelector: ICartSelector,
) => {
  if (!cartSelector) return

  cartSelector.data = {
    ...cartSelector.data,
    quantity: currentQuantity,
  }

  const prevSelectorsList = [...cartSelector.selectedState]
  const foundIdx = prevSelectorsList.findIndex(
    (el) => el?.id === cartSelector?.data?.id,
  )

  foundIdx > -1
    ? prevSelectorsList.splice(foundIdx, 1)
    : prevSelectorsList.push(cartSelector?.data)

  cartSelector.setSelectedState(prevSelectorsList)
}
