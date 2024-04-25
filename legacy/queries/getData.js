import fetchData from '../helpers/fetchData'

export const getData = async (query, dataName, variables = {}) => {
  const data = await fetchData(query, {
    variables,
  })
  return data?.data[dataName]
}
