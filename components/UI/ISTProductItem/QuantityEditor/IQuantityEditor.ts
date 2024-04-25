export type quantityEditor_onChange = (quantity: number) => void

export type quantityEditor_onDelete = () => void

export interface IQuantityEditor {
  quantity: number
  onChange: quantityEditor_onChange
  onDelete: quantityEditor_onDelete
  blocked?: boolean
}

export const quantityRegex = new RegExp(/\b([1-9]|[1-9][0-9]|100)\b/)
