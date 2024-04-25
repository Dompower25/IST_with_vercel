type hint = {
  fieldName: string
}

export const getHintsList_hintsHelper = (
  values: string[][],
  searchInput: string,
): hint[][] => {
  const outArr = new Array<hint[]>()
  values.map((outside) => {
    if (!outside) return
    const newHintsList = new Array<hint>()
    outside.map((inside) => {
      newHintsList.push({ fieldName: inside })
    })
    outArr.push(
      newHintsList.filter((hint) =>
        hint.fieldName.toLowerCase().includes(searchInput.toLowerCase()),
      ),
    )
  })

  return outArr
}
